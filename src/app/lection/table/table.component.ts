import { Component, OnInit, ViewChild} from '@angular/core';
import { DataTable, DataTableTranslations } from '../../data-table';
import {LectionMainDto} from '../../entity/LectionMainDto';
import {HttpService} from '../../service/http.service';
import {LectionSearchParams} from '../../search/params/LectionSearchParams';
import {LectionSearchService} from '../../search/LectionSearchService';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [HttpService]
})

export class LectionTableComponent implements OnInit {

    lections: LectionMainDto[] = [];
    service: LectionSearchService = new LectionSearchService(this.http);
    lectionCount = 0;

    id: number;
    name: string;
    pair: string;
    course: string;

  ngOnInit() {
  }
	
	getSearchParams(): LectionSearchParams {
		let result: LectionSearchParams = new LectionSearchParams;
		result.id=this.id;
		result.pair=this.pair;
		result.name=this.name;
		result.course=this.course;
		return result;
	}

    @ViewChild(DataTable) lectionTable;

    constructor(private http: HttpService) {
        this.service.count(this.getSearchParams()).subscribe(count => this.lectionCount=count);
    }

    reloadLections(dataParams) {
        this.service.search(this.getSearchParams(), dataParams).subscribe(data => this.lections=data);
        this.service.count(this.getSearchParams()).subscribe(count => this.lectionCount=count);
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
