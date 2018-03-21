import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {MarkService} from '../../service/mark.service';
import {LectionService} from '../../service/lection.service';
import {StudentService} from '../../service/student.service';
import {GroupService} from '../../service/group.service';
import {PairService} from '../../service/pair.service';
import {MarkDto} from '../../entity/MarkDto';
import {MarkMainDto} from '../../entity/MarkMainDto';
import {PairMainDto} from '../../entity/PairMainDto';
import {PairDto} from '../../entity/PairDto';
import {GroupMainDto} from '../../entity/GroupMainDto';
import {Router} from '@angular/router';
import {SelectedItemDto} from'../../entity/SelectedItemDto';
import {SelectItem} from 'primeng/api';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {RoleService} from '../../service/role.service';
import * as moment from 'moment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class PairCardComponent implements OnInit {

  roleService: RoleService = new RoleService();
  markService: MarkService = new MarkService(this.http);
  studentService: StudentService = new StudentService(this.http);
  pairService: PairService = new PairService(this.http);
  lectionService: LectionService = new LectionService(this.http);
  groupService: GroupService = new GroupService(this.http);
	id: number;
  mode:string;
	markMode: string;
  mark:number;
  name:string;
  entity: PairMainDto;
	marks: MarkMainDto[];
  selectedMarks: MarkMainDto[] = [];
  lections: SelectItem[] =[];
  students: SelectItem[] =[];
  pairTimes: SelectItem[] = [];
  markCols:any[];
  groupCols:any[];
  displayModal = false;
  date: Date;
  groupPairs:GroupMainDto[];
  selectedGroupPairs:GroupMainDto[] =[];
  groupWithoutPairs: GroupMainDto[];
  selectedGroupWithoutPairs:GroupMainDto[] =[];
  markTableDisplaying = false;
  pairEditForm: FormGroup;
  pairCreateForm: FormGroup;
  markForm: FormGroup;

ngOnInit() {
     this.pairEditForm = this.formBuilder.group({
            'name': new FormControl('', Validators.maxLength(45)),
            'lection': new FormControl(''),
            'date' : new FormControl(''),
            'time' : new FormControl(''),
        });
     this.pairCreateForm = this.formBuilder.group({
            'name': new FormControl('', Validators.compose([Validators.maxLength(45),Validators.required])),
            'lection': new FormControl('', Validators.required),
            'date': new FormControl('', Validators.required),
            'time': new FormControl('', Validators.required)
        });
     this.markForm = this.formBuilder.group({
            'student': new FormControl('', Validators.required),
            'mark': new FormControl('', Validators.required)
        });
  }

  constructor(private activateRoute: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpService, private router: Router, private messageService: MessageService) { 
  	activateRoute.queryParams.subscribe(params=> {
      this.id=params['id'];
      this.mode=params['mode'];
      if(this.id>0){
        this.reloadMarkItems();
        this.reloadItems();
      }
      this.lectionService.getDictionary().subscribe(data => {
      data.map(lection => {
        this.lections.push({label:lection.name,value:lection.id});
      });
    });
       this.pairService.getPairTimeDictionary().subscribe(data => {
      data.map(time => {
        this.pairTimes.push({label:time.name,value:time.id});
      });
    });
      this.studentService.getDictionary().subscribe(data => {
      data.map(student => {
        this.students.push({label:student.name,value:student.id});
      });
    });
       this.markCols = [
            { field: 'id', header: 'Id', method:'equals' },
            { field: 'student', header: 'Student name',method:'contains' },
            { field: 'mark', header: 'Mark',method:'equals' }
        ];
        this.groupCols = [
            { field: 'id', header: 'Id', method:'equals' },
            { field: 'name', header: 'Name',method:'contains' },
        ]
  	});
  }
  
  reloadItems() {
    this.pairService.get(this.id).subscribe(data => {
      this.entity=data;
    });
    this.groupService.getGroupsByPairId(this.id).subscribe(
          data => {
            this.groupPairs=data;
          });  
      this.groupService.getGroupsWithoutPair(this.id).subscribe(
          data => {
            this.groupWithoutPairs=data;
          });    
  }

  addGroupToPair() {
      for(let i=0;i<this.selectedGroupWithoutPairs.length;i++) {
          this.groupPairs.push(this.selectedGroupWithoutPairs[i]);
          let index = this.groupWithoutPairs.indexOf(this.selectedGroupWithoutPairs[i]);
          this.groupWithoutPairs.splice(index,1);
      }
      this.selectedGroupWithoutPairs=[];
    }

    removeGroupFromPair() {
      for(let i=0;i<this.selectedGroupPairs.length;i++) {
        this.groupWithoutPairs.push(this.selectedGroupPairs[i]);
        let index = this.groupPairs.indexOf(this.selectedGroupPairs[i]);
        this.groupPairs.splice(index,1);
      }
      this.selectedGroupPairs=[];
    }

    isGroupPairsSelected():boolean {
      return this.selectedGroupPairs.length>0;
    }

    isGroupWithoutPairsSelected():boolean {
      return this.selectedGroupWithoutPairs.length>0;
    }

    applyChanges() {
      let array:number[] = [];
      this.groupPairs.map(group => array.push(group.id));
      return this.pairService.addGroupsToPair(array,this.id).subscribe(data => {
        this.reloadItems();
        this.messageService.add({severity:'success',summary:'Success',detail:'Pair groups updated'});
      }, error => {
        this.messageService.add({severity:'error',summary:'Error',detail:'Something happened during pair groups update'});
    });
    }

  createPair() {
    let newPair:PairDto = new PairDto;
    newPair.date=moment(this.pairCreateForm.value.date).format("DD/MM/YYYY");
    newPair.lection=Number(this.pairCreateForm.value.lection);
    newPair.time=Number(this.pairCreateForm.value.time);
    newPair.name=this.pairCreateForm.value.name;
    this.pairService.create(newPair).subscribe(
      data => {
        this.messageService.add({severity:'success',summary:'Success',detail:'Pair created'});
        this.entity=data;
        this.id=this.entity.id;
        this.setViewMode();
        this.reloadItems();
      },
      error=> {
    this.messageService.add({severity:'error',summary:'Error',detail:'Something happened during create'});
      });
  }

  updatePair() {
    let newPair:PairDto = new PairDto;
     newPair.date=moment(this.pairEditForm.value.date).format("DD/MM/YYYY");
    newPair.lection=Number(this.pairEditForm.value.lection);
    newPair.time=Number(this.pairEditForm.value.time);
    newPair.name=this.pairEditForm.value.name;
    this.pairService.update(newPair,this.id).subscribe(
      data => {
        this.messageService.add({severity:'success',summary:'Success',detail:'Pair created'});
        this.entity=data;
        this.setViewMode();
        this.reloadItems();
      },
      error=> {
    this.messageService.add({severity:'error',summary:'Error',detail:'Something happened during create'});
      });
  }

  createMark() {
  	let newMark:MarkDto = new MarkDto();
    newMark.pair=this.id;
    newMark.mark=this.markForm.value.mark;
    newMark.student=this.markForm.value.student;
    this.markService.create(newMark).subscribe(
  		data=> {
        this.messageService.add({severity:'success',summary:'Success on creation',detail:'Mark created'});
        this.reloadMarkItems();
  		},
      error=> {
    this.messageService.add({severity:'error',summary:'Error on creation',detail:'Something happened'});
      });
  }

  updateMark() {
    let updateMark:MarkDto = new MarkDto();
    updateMark.pair=this.id;
    updateMark.mark=this.markForm.value.mark;
    this.markService.update(updateMark,this.selectedMarks[0].id).subscribe(data => {
      this.messageService.add({severity:'success',summary:'Success on editing',detail:'Mark edited'});
        this.reloadMarkItems();
      },
      error=> {
    this.messageService.add({severity:'error',summary:'Error on editing',detail:'Something happened'});
    });
  }

  deleteMark() {
      for (let mark of this.selectedMarks) {
        this.markService.delete(mark.id).subscribe(data => {
           this.messageService.add({severity:'success',summary:'Success on deleting',detail:'Mark deleted'});
           this.reloadMarkItems();
           this.selectedMarks=[];
      },
      error => {
          this.messageService.add({severity:'success',summary:'Error on deleting',detail:'Something happened'});
        });
      }
    }

  goToRegistry() {
    this.router.navigate(['Marks']);
  }

  reloadMarkItems() {
    this.markService.getMarksByPairId(this.id).subscribe(data => {
  		this.marks=data;
  	});
  }

isViewMode():boolean{
    return this.mode==="view";
  }

  isEditMode():boolean{
    return this.mode==="edit";
  }

  isCreateMode():boolean{
    return this.mode==="create";
  }

  setEditMode() {
    this.mode="edit";
  }

  setViewMode() {
    this.mode="view";
  }

  checkPageMode():boolean {
  	if( this.mode==="edit"||this.mode==="view") {
  		return true;
  	}else	if(this.mode==="create") {
  		return false;
  	}
  }

  checkMarkTableMode():boolean {
    return (this.markMode==="edit")?true:false;
  }

  isMarkEditMode():boolean{
  	return this.markMode==="edit";
  }

  isMarkCreateMode():boolean{
  	return this.markMode==="create";
  }

  setMarkEditMode() {
  	this.markMode="edit";
    this.markForm.controls['student'].clearValidators;
  }

  setMarkCreateMode() {
    this.markMode="create";
    this.markForm.controls['student'].setValidators(Validators.required);
  }

  getPair():string {
    return (this.isMarkEditMode()&&this.selectedMarks.length!==0)?this.selectedMarks[0].pair:"";
  }

  getStudent() {
    return (this.isMarkEditMode()&&this.selectedMarks.length!==0)?this.selectedMarks[0].student:"";
  }

  getMark() {
    return (this.isMarkEditMode()&&this.selectedMarks.length!==0)?this.selectedMarks[0].mark:"";
  }

  showModal() {
    this.displayModal=true;
  }

  hideModal() {
    this.displayModal=false;
  }

  showCreateMarkModal() {
    this.markMode="create";
    this.showModal();
  }

  showEditMarkModal() {
    this.markMode="edit";
    this.showModal();
  }
  
  isOneMarkSelected():boolean {
      return this.selectedMarks.length!==0&&this.selectedMarks.length<2;
      
    }

    isManyMarksSelected():boolean {
      return this.selectedMarks.length!==0;
    }

    

    getName():string {
    return this.entity===undefined?"":this.entity.name;
  }

  getLection():string {
    return this.entity===undefined?"":this.entity.lection;
  }

  getDate():string {
    return this.entity===undefined?"":this.entity.date;
  }

  getPairTime(): string {
    return this.entity===undefined?"":this.entity.startTime+" - "+this.entity.endTime;
  }

  showMarkTable() {
    this.markTableDisplaying=true;
  }

  showGroupTable() {
    this.markTableDisplaying=false;
  }

}
