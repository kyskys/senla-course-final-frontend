import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {CourseService} from '../../service/course.service';
import {LectionService} from '../../service/lection.service';
import {LecturerService} from '../../service/lecturer.service';
import {RoleService} from '../../service/role.service';
import {CourseDto} from '../../entity/CourseDto';
import {CourseUpdateDto} from '../../entity/CourseUpdateDto';
import {CourseLectionDto} from '../../entity/CourseLectionDto';
import {CourseMainDto} from '../../entity/CourseMainDto';
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
export class CourseCardComponent {

  roleService: RoleService = new RoleService();
	courseService: CourseService = new CourseService(this.http);
  lectionService: LectionService = new LectionService(this.http);
  lecturerService: LecturerService = new LecturerService(this.http);
  courseLections:CourseLectionDto[];
  selectedCourseLections:CourseLectionDto[] =[];
  lectionsWithoutCourse: CourseLectionDto[];
  selectedLectionsWithoutCourse:CourseLectionDto[] =[];
	id: number;
	mode: string;
	entity: CourseMainDto;
  cols:any[];
  lecturers: SelectItem[] =[];
  selectedLecturer: SelectItem;
  msgs: Message[] = [];
  courseEditForm: FormGroup;
  courseCreateForm: FormGroup;

ngOnInit() {
     this.courseEditForm = this.formBuilder.group({
            'name': new FormControl('', Validators.maxLength(45)),
            'description': new FormControl('', Validators.maxLength(100)),
            'lecturer' : new FormControl('')
        });
     this.courseCreateForm = this.formBuilder.group({
            'name': new FormControl('', Validators.compose([Validators.maxLength(45),Validators.required])),
            'description': new FormControl('', Validators.maxLength(100))
        });
  }

  constructor(private activateRoute: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpService, private router: Router, private messageService: MessageService) { 
  	activateRoute.queryParams.subscribe(params=> {
  		this.id=params['id'];
  		this.mode=params['mode']; 
      this.lecturerService.getDictionary().subscribe(data => {
      data.map(lecturer => {
        this.lecturers.push({label:lecturer.name,value:lecturer.id});
      });
    });
      if(this.id>0) {
        this.reloadItems();
      }
       this.cols = [
{ field: 'id', header: 'Id', method: 'equals'},
{ field: 'name', header: 'Leciton name', method: 'contains'},
{ field: 'pair', header: 'Pair name', method: 'contains'}
];
  	});
  }
  
  createCourse() {
  	let newCourse:CourseDto = new CourseDto();
  	newCourse.name=this.courseCreateForm.value.name;
  	newCourse.description=this.courseCreateForm.value.description;
    this.courseService.create(newCourse).subscribe(
  		data=> {
        this.messageService.add({severity:'success',summary:'Success',detail:'Course created'});
  			this.entity=data;
        this.id=this.entity.id; 
        this.setViewMode();
        this.reloadItems();
  		},
      error=> {
        this.messageService.add({severity:'error',summary:'Error',detail:'Something happened during create'});
      });
  }

  updateCourse() {
    let updateCourse:CourseUpdateDto = new CourseUpdateDto();
    updateCourse.description=this.courseEditForm.value.description;
    updateCourse.name=this.courseEditForm.value.name;
    updateCourse.lecturer=Number(this.courseEditForm.value.lecturer);
    this.courseService.update(updateCourse,this.id).subscribe(data => {
      this.messageService.add({severity:'success',summary:'Success',detail:'Course updated'});
      this.reloadItems();
    }, error => {
      this.messageService.add({severity:'error',summary:'Error',detail:'Something happened during update'});
    });
    
  }

  goToRegistry() {
    this.router.navigate(['courses']);
  }

  reloadItems() {
    this.courseService.get(this.id).subscribe(data => {
  		this.entity=data;
  	});
     this.lectionService.getLectionsByCourseId(this.id).subscribe(
          data => {
            this.courseLections=data;
          });   
      this.lectionService.getLectionsWithoutCourse().subscribe(
          data => {
            this.lectionsWithoutCourse=data;
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

  getDescription():string {
  	return this.entity===undefined?"":this.entity.description;
  }

  getLecturer(): string{
    return this.entity===undefined?"":this.entity.lecturer;
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

    addLectionToCourse() {
      for(let i=0;i<this.selectedLectionsWithoutCourse.length;i++) {
          this.courseLections.push(this.selectedLectionsWithoutCourse[i]);
          let index = this.lectionsWithoutCourse.indexOf(this.selectedLectionsWithoutCourse[i]);
          this.lectionsWithoutCourse.splice(index,1);
      }
      this.selectedLectionsWithoutCourse=[];
    }

    removeLectionFromCourse() {
      for(let i=0;i<this.selectedCourseLections.length;i++) {
        this.lectionsWithoutCourse.push(this.selectedCourseLections[i]);
        let index = this.courseLections.indexOf(this.selectedCourseLections[i]);
        this.courseLections.splice(index,1);
      }
      this.selectedCourseLections=[];
    }

    isCourseLectionsSelected():boolean {
      return this.selectedCourseLections.length>0;
    }

    isLectionsWithoutCourseSelected():boolean {
      return this.selectedLectionsWithoutCourse.length>0;
    }

    applyChanges() {
      let array:number[] = [];
      this.courseLections.map(lection => array.push(lection.id));
      return this.courseService.addLectionsToCourse(array,this.id).subscribe(data => {
        this.reloadItems();
        this.messageService.add({severity:'success',summary:'Success',detail:'Course lections updated'});
      }, error => {
        this.messageService.add({severity:'error',summary:'Error',detail:'Something happened during course lections update'});
      });
    }

}
