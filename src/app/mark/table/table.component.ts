import { Component, OnInit, ViewChild} from '@angular/core';
import { DataTable, DataTableTranslations } from '../../data-table';
import {MarkStudentDto} from '../../entity/MarkStudentDto';
import {HttpService} from '../../service/http.service';
import {MarkService} from '../../service/mark.service';
import {MarkSearchParams} from '../../search/params/MarkSearchParams';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class MarkTableComponent implements OnInit {

    marks: MarkStudentDto[] = [];
    service: MarkService = new MarkService(this.http);
    markCount = 0;

    id: number;
    pair: string;

  ngOnInit() {
  }
	
	getSearchParams(): MarkSearchParams {
		let result: MarkSearchParams = new MarkSearchParams;
		result.id=this.id;
		result.pair=this.pair;
		return result;
	}

    @ViewChild(DataTable) markTable;

    constructor(private http: HttpService) {
        this.service.count(this.getSearchParams()).subscribe(count => this.markCount=count);
    }

    reloadMarks(dataParams) {
        this.service.getMarksByCurrentStudent(this.getSearchParams(), dataParams).subscribe(data => this.marks=data);
        this.service.getMarksCountByCurrentStudent(this.getSearchParams()).subscribe(count => this.markCount=count);
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
