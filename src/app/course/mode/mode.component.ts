import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {HttpService} from '../../service/http.service';
import {CourseService} from '../../service/course.service';
import {LectionService} from '../../service/lection.service';
import {CourseDto} from '../../entity/CourseDto';
import {CourseUpdateDto} from '../../entity/CourseUpdateDto';
import {CourseLectionDto} from '../../entity/CourseLectionDto';
import {Router} from '@angular/router';


@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.css'],
  providers: [HttpService]
})
export class CourseModeComponent implements OnInit {

	courseService: CourseService = new CourseService(this.http);
  lectionService: LectionService = new LectionService(this.http);
  courseLections:CourseLectionDto[];
  selectedCourseLections:CourseLectionDto[] =[];
  lectionsWithoutCourse: CourseLectionDto[];
  selectedLectionsWithoutCourse:CourseLectionDto[] =[];
	id: number;
	name: string;
	description: string;
	mode: string;
	subscription: Subscription;
	entity: CourseDto;
  cols:any[];

  constructor(private activateRoute: ActivatedRoute, private http: HttpService, private router: Router) { 
  	this.subscription=activateRoute.queryParams.subscribe(params=> {
  		this.id=params['id'];
  		this.mode=params['mode'];
      if(this.id>0) {
        this.reloadItems();
      }
       this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'name', header: 'Leciton name' },
            { field: 'pair', header: 'Pair name' }
        ];
  	});
  }

  ngOnInit() {
    
  }
  
  createCourse() {
  	let newCourse:CourseDto = new CourseDto();
  	newCourse.name=this.name;
  	newCourse.description=this.description;
    this.courseService.create(newCourse).subscribe(
  		data=> {
  			this.entity=data;
        this.setViewMode();
        this.name='';
        this.description='';
  		});
  }

  updateCourse() {
    let updateCourse:CourseUpdateDto = new CourseUpdateDto();
    updateCourse.description=this.description;
    updateCourse.name=this.name;
    this.courseService.update(updateCourse,this.id).subscribe(data => this.reloadItems());
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
      this.lectionService.getLectionsWithoutCourse(this.id).subscribe(
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

  getDescription():string{
  	return this.entity===undefined?"":this.entity.description;
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
      return !(this.selectedCourseLections.length>0);
    }

    isLectionsWithoutCourseSelected():boolean {
      return !(this.selectedLectionsWithoutCourse.length>0);
    }

    applyChanges() {
      let array:number[] = [];
      this.courseLections.map(lection => array.push(lection.id));
      return this.courseService.addLectionsToCourse(array,this.id).subscribe(data => this.reloadItems());
    }
}
