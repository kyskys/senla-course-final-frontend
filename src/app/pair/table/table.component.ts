import { Component, OnInit, ViewChild} from '@angular/core';
import { DataTable, DataTableTranslations } from '../../data-table';
import {PairGetDto} from '../../entity/PairGetDto';
import {PairMainDto} from '../../entity/PairMainDto';
import {HttpService} from '../../service/http.service';
import {PairSearchParams} from '../../search/params/PairSearchParams';
import {PairService} from '../../service/pair.service';
import {Router} from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [HttpService]
})
export class PairTableComponent implements OnInit {

    pairs: PairMainDto[] = [];
    service: PairService = new PairService(this.http);
    pairCount = 0;

    id: number;
    name: string;
    lection: string;
    date: Date;

  ngOnInit() {
  }
	
	getSearchParams(): PairSearchParams {
		let result: PairSearchParams = new PairSearchParams;
		result.id=this.id;
		result.name=this.name;
		result.lection=this.lection;
		result.date=this.date!==undefined?moment(this.date).format("DD/MM/YYYY"):undefined;
		return result;
	}

    @ViewChild(DataTable) pairTable;

    constructor(private http: HttpService, private router: Router) {
        this.service.count(this.getSearchParams()).subscribe(count => this.pairCount=count);
    }

    reloadPairs(dataParams) {
        this.service.search(this.getSearchParams(), dataParams).subscribe(data => {
          this.pairs=data;
        });
        this.service.count(this.getSearchParams()).subscribe(count => this.pairCount=count);
    }

    // special params:

    translations = <DataTableTranslations>{
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'
    };

    createPair() {
      this.router.navigate(['pair'],{queryParams:{'mode':'create'}});
    }

    editPair() {
      this.router.navigate(['pair'],{queryParams:{'mode':'edit','id':this.getPairId()}});
    }

    viewPair() {
      this.router.navigate(['pair'],{queryParams:{'mode':'view','id':this.getPairId()}});
    }

    deletePair() {
      for (let Pair of this.pairTable.selectedRows) {
        this.service.delete(Pair.item.id).subscribe(data => this.pairTable.reloadItems());
      }
    }

    isOneSelected():boolean {
      return this.pairTable.selectedRows.length!==0&&this.pairTable.selectedRows.length<2;
      
    }

    isManySelected():boolean {
      return this.pairTable.selectedRows.length!==0;
    }

    getPairId():number {
        return this.pairTable.selectedRows[0].item.id;
    }
}
