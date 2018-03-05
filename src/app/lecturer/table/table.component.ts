import { Component, OnInit, ViewChild} from '@angular/core';
import { DataTable, DataTableTranslations, DataTableResource } from '../../data-table';
import {LecturerMainDto} from '../../entity/LecturerMainDto';
import {HttpService} from '../../service/http.service';
import {LecturerSearchParams} from '../../search/params/LecturerSearchParams';
import {LecturerSearchService} from '../../search/LecturerSearchService';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [HttpService]
})
export class LecturerTableComponent implements OnInit {

    lecturers: LecturerMainDto[] = [];
    service: LecturerSearchService = new LecturerSearchService(this.http);
    lecturerCount = 0;

    id: number;
    name: string;
    email:string;
    number: number;

  ngOnInit() {
  }
	
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
        this.service.count(this.getSearchParams()).subscribe(count => this.lecturerCount=count);
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
