import { Component, OnInit, ViewChild} from '@angular/core';
import { DataTable, DataTableTranslations } from '../../data-table';
import {LectionMainDto} from '../../entity/LectionMainDto';
import {HttpService} from '../../service/http.service';
import {LectionSearchParams} from '../../search/params/LectionSearchParams';
import {LectionService} from '../../service/lection.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [HttpService]
})

export class LectionTableComponent implements OnInit {

    lections: LectionMainDto[] = [];
    service: LectionService = new LectionService(this.http);
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

    constructor(private http: HttpService, private router: Router) {
        this.service.count(this.getSearchParams()).subscribe(count => this.lectionCount=count);
    }

    reloadLections(dataParams) {
        this.service.search(this.getSearchParams(), dataParams).subscribe(data => this.lections=data);
        this.service.count(this.getSearchParams()).subscribe(count => this.lectionCount=count);
    }

   createLection() {
      this.router.navigate(['lection'],{queryParams:{'mode':'create'}});
    }

    editLection() {
      this.router.navigate(['lection'],{queryParams:{'mode':'edit','id':this.lectionTable.selectedRows[0].item.id}});
    }

    viewLection() {
      this.router.navigate(['lection'],{queryParams:{'mode':'view','id':this.lectionTable.selectedRows[0].item.id}});
    }

    deleteLection() {
      for (let lection of this.lectionTable.selectedRows) {
        this.service.delete(lection.item.id).subscribe(data => this.lectionTable.reloadItems());
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

    ifOneSelected():boolean {
      return this.lectionTable.selectedRows.length!==0&&this.lectionTable.selectedRows.length<2?false:true;
      
    }

    ifManySelected():boolean {
      return this.lectionTable.selectedRows.length!==0?false:true;
    }
}
