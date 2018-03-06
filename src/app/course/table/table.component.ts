import { Component, OnInit, ViewChild} from '@angular/core';
import { DataTable, DataTableTranslations, DataTableResource } from '../../data-table';
import {CourseMainDto} from '../../entity/CourseMainDto';
import {HttpService} from '../../service/http.service';
import {CourseSearchParams} from '../../search/params/CourseSearchParams';
import {CourseService} from '../../service/course.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [HttpService]
})

export class CourseTableComponent implements OnInit {

    courses: CourseMainDto[] = [];
    service: CourseService = new CourseService(this.http);
    courseCount = 0;

    id: number;
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
        this.service.count(this.getSearchParams()).subscribe(count => this.courseCount=count);
    }

    reloadCourses(dataParams) {
        this.service.search(this.getSearchParams(), dataParams).subscribe(data => this.courses=data);
        this.service.count(this.getSearchParams()).subscribe(count => this.courseCount=count);
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
