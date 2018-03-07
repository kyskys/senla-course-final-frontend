import { Component, OnInit, ViewChild} from '@angular/core';
import { DataTable, DataTableTranslations } from '../../data-table';
import {MarkMainDto} from '../../entity/MarkMainDto';
import {HttpService} from '../../service/http.service';
import {MarkSearchParams} from '../../search/params/MarkSearchParams';
import {MarkSearchService} from '../../search/MarkSearchService';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [HttpService]
})
export class MarkTableComponent implements OnInit {

    marks: MarkMainDto[] = [];
    service: MarkSearchService = new MarkSearchService(this.http);
    markCount = 0;

    id: number;
    pair: string;
    student: string;

  ngOnInit() {
  }
	
	getSearchParams(): MarkSearchParams {
		let result: MarkSearchParams = new MarkSearchParams;
		result.id=this.id;
		result.pair=this.pair;
		result.student=this.student;
		return result;
	}

    @ViewChild(DataTable) markTable;

    constructor(private http: HttpService) {
        this.service.count(this.getSearchParams()).subscribe(count => this.markCount=count);
    }

    reloadMarks(dataParams) {
        this.service.search(this.getSearchParams(), dataParams).subscribe(data => this.marks=data);
        this.service.count(this.getSearchParams()).subscribe(count => this.markCount=count);
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
