import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {HttpService} from '../../service/http.service';
import {CourseService} from '../../service/course.service';
import {CourseDto} from '../../entity/CourseDto';
import {CourseUpdateDto} from '../../entity/CourseUpdateDto';
import {Router} from '@angular/router';


@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.css'],
  providers: [HttpService]
})
export class CourseModeComponent implements OnInit {

	service: CourseService = new CourseService(this.http);
	id: number;
	name: string;
	description: string;
	mode: string;
	subscription: Subscription;
	entity: CourseDto;

  constructor(private activateRoute: ActivatedRoute, private http: HttpService, private router: Router) { 
  	this.subscription=activateRoute.queryParams.subscribe(params=> {
  		this.id=params['id'];
  		this.mode=params['mode'];
      if(this.id>0) {
        this.reloadItems();
      }
  	});
  }

  ngOnInit() {
  }
  
  createCourse() {
  	let newCourse:CourseDto = new CourseDto();
  	newCourse.name=this.name;
  	newCourse.description=this.description;
  	this.service.create(newCourse).subscribe(
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
    this.service.update(updateCourse,this.id).subscribe(data => this.reloadItems());
  }

  goToRegistry() {
    this.router.navigate(['courses']);
  }

  reloadItems() {
  	this.service.get(this.id).subscribe(data => {
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

}
