import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {CourseService} from '../../service/course.service';
import {LectionService} from '../../service/lection.service';
import {LectionDto} from '../../entity/LectionDto';
import {LectionMainDto} from '../../entity/LectionMainDto';
import {LectionUpdateDto} from '../../entity/LectionUpdateDto';
import {Router} from '@angular/router';
import {SelectedItemDto} from'../../entity/SelectedItemDto';
import {SelectItem} from 'primeng/api';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class LectionCardComponent implements OnInit {
courseService: CourseService = new CourseService(this.http);
  lectionService: LectionService = new LectionService(this.http);
  id: number;
	mode: string;
	entity: LectionMainDto;
  courses: SelectItem[] =[];
  lectionEditForm: FormGroup;
  lectionCreateForm: FormGroup;

ngOnInit() {
     this.lectionEditForm = this.formBuilder.group({
            'name': new FormControl('', Validators.maxLength(45)),
            'course': new FormControl('')
        });
     this.lectionCreateForm = this.formBuilder.group({
            'name': new FormControl('', Validators.compose([Validators.maxLength(45),Validators.required]))
        });
  }

  constructor(private activateRoute: ActivatedRoute, private messageService: MessageService, private http: HttpService, private router: Router, private formBuilder: FormBuilder) { 
activateRoute.queryParams.subscribe(params=> {
      this.id=params['id'];
      this.mode=params['mode'];
      this.courseService.getAll().subscribe(data => {
      data.map(course => {
        this.courses.push({label:course.name,value:course.id});
      });
    });
      if(this.id>0) {
        this.reloadItems();
      }
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

  reloadItems() {
    this.lectionService.get(this.id).subscribe(data => {
      this.entity=data;
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

  createLection() {
    let newLection:LectionDto = new LectionDto();
    newLection.name=this.lectionCreateForm.value.name;
    this.lectionService.create(newLection).subscribe(
      data=> {
        this.messageService.add({severity:'success',summary:'Success', detail:'Lection created'});
        this.entity=data;
        this.id=this.entity.id;
        this.setViewMode();
        this.reloadItems();
      }, error => {
        this.messageService.add({severity:'error',summary:'Error',detail:'Something happened during create'});
      });
  }

updateLection() {
    let updateLection:LectionUpdateDto = new LectionUpdateDto();
    updateLection.course=Number(this.lectionEditForm.value.course);
    updateLection.name=this.lectionEditForm.value.name;
    this.lectionService.update(updateLection,this.id).subscribe(data => {
      this.messageService.add({severity:'success',summary:'Success', detail:'Lection updated'});
      this.reloadItems();
    }, error => {
       this.messageService.add({severity:'error',summary:'Error',detail:'Something happened during update'});
    });
  }

  goToRegistry() {
    this.router.navigate(['lections']);
  }

  getName():string {
    return this.entity===undefined?"":this.entity.name;
  }

  getCourse():string{
    return this.entity===undefined?"":this.entity.course;
  }


}
