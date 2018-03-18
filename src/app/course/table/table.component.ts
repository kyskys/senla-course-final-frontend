import { Component, ViewChild} from '@angular/core';
import { DataTable, DataTableTranslations } from '../../data-table';
import {CourseMainDto} from '../../entity/CourseMainDto';
import {HttpService} from '../../service/http.service';
import {CourseSearchParams} from '../../search/params/CourseSearchParams';
import {CourseService} from '../../service/course.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class CourseTableComponent {

    courses: CourseMainDto[] = [];
    service: CourseService = new CourseService(this.http);
    courseCount = 0;

    id: number;
    name: string;
    lecturer: string;
	
	getSearchParams(): CourseSearchParams {
		let result: CourseSearchParams = new CourseSearchParams;
		result.id=this.id;
		result.lecturer=this.lecturer;
		result.name=this.name;
		return result;
	}

    @ViewChild(DataTable) courseTable;

    constructor(private http: HttpService, private router: Router, private messageService: MessageService) {
    }

    reloadCourses(dataParams) {
        this.service.search(this.getSearchParams(), dataParams).subscribe(data => this.courses=data);
        this.service.count(this.getSearchParams()).subscribe(count => this.courseCount=count);
    }

    createCourse() {
    	this.router.navigate(['course'],{queryParams:{'mode':'create'}});
    }

    editCourse() {
    	this.router.navigate(['course'],{queryParams:{'mode':'edit','id':this.getCourseId()}});
    }

    viewCourse() {
    	this.router.navigate(['course'],{queryParams:{'mode':'view','id':this.getCourseId()}});
    }

    deleteCourse() {
    	for (let course of this.courseTable.selectedRows) {
    		this.service.delete(course.item.id).subscribe(data => {
                this.messageService.add({severity:'success',summary:'Success', detail:'Courses deleted'});
                this.courseTable.reloadItems();
            }, error => {
               this.messageService.add({severity:'error',summary:'Error during delete', detail:'Something happened...'});
            });
    	}
    }

    // special params:

    translations = <DataTableTranslations>{
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'
    };

    isOneSelected():boolean {
    	return this.courseTable.selectedRows.length!==0&&this.courseTable.selectedRows.length<2;
    	
    }

    isManySelected():boolean {
    	return this.courseTable.selectedRows.length!==0;
    }

    getCourseId():number {
        return this.courseTable.selectedRows[0].item.id;
    }
}
