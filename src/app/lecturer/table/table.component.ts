import { Component, ViewChild} from '@angular/core';
import { DataTable, DataTableTranslations } from '../../data-table';
import {LecturerMainDto} from '../../entity/LecturerMainDto';
import {HttpService} from '../../service/http.service';
import {LecturerService} from '../../service/lecturer.service';
import {LecturerSearchParams} from '../../search/params/LecturerSearchParams';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class LecturerTableComponent {

    lecturers: LecturerMainDto[] = [];
    service: LecturerService = new LecturerService(this.http);
    lecturerCount = 0;

    id: number;
    name: string;
    email:string;
    number: number;
	
	getSearchParams(): LecturerSearchParams {
		let result: LecturerSearchParams = new LecturerSearchParams;
		result.id=this.id;
		result.email=this.email;
		result.name=this.name;
		result.number=this.number;
		return result;
	}

    @ViewChild(DataTable) lecturerTable;

    constructor(private http: HttpService) {
    }

    reloadLecturers(dataParams) {
        this.service.search(this.getSearchParams(), dataParams).subscribe(data => this.lecturers=data);
        this.service.count(this.getSearchParams()).subscribe(count => this.lecturerCount=count);
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
