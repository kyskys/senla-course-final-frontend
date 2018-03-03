import { Component, OnInit, ViewChild} from '@angular/core';
import { DataTable, DataTableTranslations, DataTableResource } from '../../data-table';
import {CourseMainDto} from '../../entity/CourseMainDto';
import {HttpService} from '../../service/http.service';
import {courses} from './data';
import {CourseSearchParams} from '../../search/params/CourseSearchParams';
import {CourseSearchService} from '../../search/CourseSearchService';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [HttpService]
})
export class CourseTableComponent implements OnInit {

    courses: CourseMainDto[] = [];
    service: CourseSearchService = new CourseSearchService;
	courseResource = new DataTableResource(this.courses,this.http, this.service);
    courseCount = 0;

    id: string;
    name: string;
    lecturer: string;

  ngOnInit() {
  }
	
	getSearchParams(): CourseSearchParams {
		let result: CourseSearchParams = new CourseSearchParams;
		result.id=this.id;
		result.lecturer=this.lecturer;
		result.name=this.name;
		return result;
	}

    @ViewChild(DataTable) courseTable;

    constructor(private http: HttpService) {
        this.courseResource.count(this.getSearchParams()).subscribe(count => this.courseCount=count);
    }

    reloadCourses(dataParams) {
        this.courseResource.query(dataParams, this.getSearchParams()).subscribe(data => this.courses=data);
        this.courseResource.count(this.getSearchParams()).subscribe(count => this.courseCount=count);
    }

    // special params:

    translations = <DataTableTranslations>{
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'
    };
}
