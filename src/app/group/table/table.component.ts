import { Component, OnInit, ViewChild} from '@angular/core';
import { DataTable, DataTableTranslations, DataTableResource } from '../../data-table';
import {GroupMainDto} from '../../entity/GroupMainDto';
import {HttpService} from '../../service/http.service';
import {GroupSearchParams} from '../../search/params/GroupSearchParams';
import {GroupSearchService} from '../../search/GroupSearchService';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [HttpService]
})
export class GroupTableComponent implements OnInit {

    groups: GroupMainDto[] = [];
    service: GroupSearchService = new GroupSearchService(this.http);
    groupCount = 0;

    id: number;
    name: string;

  ngOnInit() {
  }
	
	getSearchParams(): GroupSearchParams {
		let result: GroupSearchParams = new GroupSearchParams;
		result.id=this.id;
		result.name=this.name;
		return result;
	}

    @ViewChild(DataTable) groupTable;

    constructor(private http: HttpService) {
        this.service.count(this.getSearchParams()).subscribe(count => this.groupCount=count);
    }

    reloadGroups(dataParams) {
        this.service.search(this.getSearchParams(), dataParams).subscribe(data => this.groups=data);
        this.service.count(this.getSearchParams()).subscribe(count => this.groupCount=count);
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
