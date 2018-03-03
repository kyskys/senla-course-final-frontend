import { Component, OnInit } from '@angular/core';
import {HttpService} from '../service/http.service';
import {CourseMainDto} from '../entity/CourseMainDto';

@Component({
  selector: 'app-course.main',
  templateUrl: './course.main.component.html',
  styleUrls: ['./course.main.component.css'],
  providers: [HttpService]
})
export class CourseMainComponent implements OnInit {
	courses: CourseMainDto[];
	test: CourseMainDto;
  constructor(private service: HttpService) {
  	this.service.doGet("http://localhost:8080/webapp/api/course/").subscribe(
   	 (msg:any)=> {
      this.courses = msg;
    	}
   	);
  }

  ngOnInit() {
  }

}
