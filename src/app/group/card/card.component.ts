import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {GroupService } from '../../service/group.service';
import {StudentService} from '../../service/student.service';
import {LecturerService} from '../../service/lecturer.service';
import {GroupDto} from '../../entity/GroupDto';
import {GroupStudentDto} from '../../entity/GroupStudentDto';
import {GroupMainDto} from '../../entity/GroupMainDto';
import {Router} from '@angular/router';
import {SelectedItemDto} from'../../entity/SelectedItemDto';
import {SelectItem} from 'primeng/api';
import {Message} from 'primeng/components/common/api';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class GroupCardComponent implements OnInit {

	groupService: GroupService = new GroupService(this.http);
  studentService: StudentService = new StudentService(this.http);
  lecturerService: LecturerService = new LecturerService(this.http);
  groupStudents:GroupStudentDto[];
  selectedGroupStudents:GroupStudentDto[] =[];
  studentsWithoutGroup: GroupStudentDto[];
  selectedStudentsWithoutGroup:GroupStudentDto[] =[];
	id: number;
	mode: string;
	entity: GroupMainDto;
  cols:any[];
  groupEditForm: FormGroup;
  groupCreateForm: FormGroup;

  ngOnInit() {
     this.groupEditForm = this.formBuilder.group({
            'name': new FormControl('', Validators.maxLength(45))
        });
     this.groupCreateForm = this.formBuilder.group({
            'name': new FormControl('', Validators.compose([Validators.maxLength(45),Validators.required]))
        });
  }

  constructor(private activateRoute: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpService, private router: Router, private messageService: MessageService) { 
  	activateRoute.queryParams.subscribe(params=> {
  		this.id=params['id'];
  		this.mode=params['mode']; 
      if(this.id>0) {
        this.reloadItems();
      }
       this.cols = [
            { field: 'id', header: 'Id', method: 'equals' },
            { field: 'name', header: 'Student name', method: 'contains' },
            { field: 'email', header: 'Email', method: 'contains' },
            { field: 'number', header: 'Phone number', method: 'contains' }
        ];
  	});
  }
  
  createGroup() {
  	let newGroup:GroupDto = new GroupDto();
  	newGroup.name=this.groupCreateForm.value.name;
    this.groupService.create(newGroup).subscribe(
  		data=> {
        this.messageService.add({severity:'success',summary:'Success', detail:'Group created'});
  			this.entity=data;
        this.id=this.entity.id; 
        this.setViewMode();
        this.reloadItems();
  		},
      error=> {
    this.messageService.add({severity:'error',summary:'Error',detail:'Something happened during create'});
      });
  }

  updateGroup() {
    let updateGroup:GroupDto = new GroupDto();
    updateGroup.name=this.groupEditForm.value.name;
     this.groupService.update(updateGroup,this.id).subscribe(data => {
      this.messageService.add({severity:'success',summary:'Success',detail:'Group updated'});
      this.reloadItems();
      }, error => {
    this.messageService.add({severity:'error',summary:'Error',detail:'Something happened during update'});
    });
}

  goToRegistry() {
    this.router.navigate(['groups']);
  }

  reloadItems() {
    this.groupService.get(this.id).subscribe(data => {
  		this.entity=data;
  	});
     this.studentService.getStudentsByGroupId(this.id).subscribe(
          data => {
            this.groupStudents=data;
          });  
      this.studentService.getStudentsWithoutGroup().subscribe(
          data => {
            this.studentsWithoutGroup=data;
          });    
  }

  checkPageMode():boolean {
  	if(this.mode==="edit"||this.mode==="view") {
  		return true;
  	}
  	if(this.mode==="create") {
  		return false;
  	}
  }

  getName():string {
  	return this.entity===undefined?"":this.entity.name;
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

    addStudentToGroup() {
      for(let i=0;i<this.selectedStudentsWithoutGroup.length;i++) {
          this.groupStudents.push(this.selectedStudentsWithoutGroup[i]);
          let index = this.studentsWithoutGroup.indexOf(this.selectedStudentsWithoutGroup[i]);
          this.studentsWithoutGroup.splice(index,1);
      }
      this.selectedStudentsWithoutGroup=[];
    }

    removeStudentFromGroup() {
      for(let i=0;i<this.selectedGroupStudents.length;i++) {
        this.studentsWithoutGroup.push(this.selectedGroupStudents[i]);
        let index = this.groupStudents.indexOf(this.selectedGroupStudents[i]);
        this.groupStudents.splice(index,1);
      }
      this.selectedGroupStudents=[];
    }

    isGroupStudentsSelected():boolean {
      return this.selectedGroupStudents.length>0;
    }

    isStudentsWithoutGroupSelected():boolean {
      return this.selectedStudentsWithoutGroup.length>0;
    }

    applyChanges() {
      let array:number[] = [];
      this.groupStudents.map(Student => array.push(Student.id));
      return this.groupService.addStudentsToGroup(array,this.id).subscribe(data => {
        this.messageService.add({severity:'success',summary:'Success',detail:'Group students updated'});
        this.reloadItems();
      }, error => {
        this.messageService.add({severity:'error',summary:'Error',detail:'Something happened during group students update'});
      });
    }

}
