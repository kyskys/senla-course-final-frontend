import {SearchableService} from './SearchableService';
import {MarkSearchParams} from'./params/MarkSearchParams';
import {DataTableParams} from '../data-table';
import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Rx";
import {MarkMainDto} from '../entity/MarkMainDto';

export class MarkSearchService implements SearchableService<MarkSearchParams,MarkMainDto> {
	url: string = "http://localhost:8080/webapp/api/mark/";

	constructor(private http: HttpService) {

	}


	search(searchParams: MarkSearchParams, dataParams: DataTableParams): Observable<MarkMainDto[]> {
		let result: string = this.url;
		result+="search?limit="+dataParams.limit+"&sort="+dataParams.sortBy+"&offset="+dataParams.offset+"&asc="+dataParams.sortAsc;
		if(searchParams.id!==undefined&&searchParams.id>0) {
			result+="&id="+searchParams.id;
		}
		if(searchParams.pair!==undefined&&searchParams.pair!=="") {
			result+="&pair="+searchParams.pair;
		}
		if(searchParams.student!==undefined&&searchParams.student!=="") {
			result+="&student="+searchParams.student;
		}
		return this.http.doGet(result);
	}

	count(params: MarkSearchParams): Observable<number> {
		let result: string = this.url+"count";
		let first: boolean=false;
		if(params.id!==undefined&&params.id>0) {
			result+="?id="+params.id;
			first=true;
		}
		if(params.pair!==undefined&&params.pair!=="") {
			result+=(first?"&":"?")+"pair="+params.pair;
			first=true;
		}
		if(params.student!==undefined&&params.student!=="") {
			result+=(first?"&":"?")+"student="+params.student;
		}
		return this.http.doGet(result);
	}
}
