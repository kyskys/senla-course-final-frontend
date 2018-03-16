import { Component, OnInit, ViewChild} from '@angular/core';
import { DataTable, DataTableTranslations } from '../../data-table';
import {GroupMainDto} from '../../entity/GroupMainDto';
import {HttpService} from '../../service/http.service';
import {GroupSearchParams} from '../../search/params/GroupSearchParams';
import {GroupService} from '../../service/group.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [HttpService]
})
export class GroupTableComponent implements OnInit {

    groups: GroupMainDto[] = [];
    service: GroupService = new GroupService(this.http);
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

    constructor(private http: HttpService, private router: Router) {
        this.service.count(this.getSearchParams()).subscribe(count => this.groupCount=count);
    }

    reloadGroups(dataParams) {
        this.service.search(this.getSearchParams(), dataParams).subscribe(data => this.groups=data);
        this.service.count(this.getSearchParams()).subscribe(count => this.groupCount=count);
    }

    createGroup() {
      this.router.navigate(['group'],{queryParams:{'mode':'create'}});
    }

    editGroup() {
      this.router.navigate(['group'],{queryParams:{'mode':'edit','id':this.groupTable.selectedRows[0].item.id}});
    }

    viewGroup() {
      this.router.navigate(['group'],{queryParams:{'mode':'view','id':this.groupTable.selectedRows[0].item.id}});
    }

    deleteGroup() {
      for (let Group of this.groupTable.selectedRows) {
        this.service.delete(Group.item.id).subscribe(data => this.groupTable.reloadItems());
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
      return this.groupTable.selectedRows.length!==0&&this.groupTable.selectedRows.length<2;
      
    }

    isManySelected():boolean {
      return this.groupTable.selectedRows.length!==0;
    }
}
