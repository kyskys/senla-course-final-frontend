import { Component, ViewChild} from '@angular/core';
import { DataTable, DataTableTranslations } from '../../data-table';
import {StudentMainDto} from '../../entity/StudentMainDto';
import {HttpService} from '../../service/http.service';
import {StudentService} from '../../service/student.service';
import {StudentSearchParams} from '../../search/params/StudentSearchParams';
import {RoleService} from '../../service/role.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class StudentTableComponent {

    roleService: RoleService = new RoleService();
    students: StudentMainDto[] = [];
    service: StudentService = new StudentService(this.http);
    studentCount = 0;

    id: number;
    name: string;
    email:string;
    number: string;
    group:string;
	
	getSearchParams(): StudentSearchParams {
		let result: StudentSearchParams = new StudentSearchParams;
		result.id=this.id;
		result.email=this.email;
		result.name=this.name;
		result.number=this.number;
		result.group=this.group;
		return result;
	}

    @ViewChild(DataTable) studentTable;

    constructor(private http: HttpService) {
    }

    reloadStudents(dataParams) {
        this.service.search(this.getSearchParams(), dataParams).subscribe(data => this.students=data);
        this.service.count(this.getSearchParams()).subscribe(count => this.studentCount=count);
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
