import {SearchableService} from './SearchableService';
import {LectionSearchParams} from'./params/LectionSearchParams';
import {DataTableParams} from '../data-table';
import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Rx";
import {LectionMainDto} from '../entity/LectionMainDto';

export class LectionSearchService implements SearchableService<LectionSearchParams,LectionMainDto> {
	url: string = "http://localhost:8080/webapp/api/lection/";

	constructor(private http: HttpService) {

	}


	search(searchParams: LectionSearchParams, dataParams: DataTableParams): Observable<LectionMainDto[]> {
		let result: string = this.url;
		result+="search?limit="+dataParams.limit+"&sort="+dataParams.sortBy+"&offset="+dataParams.offset+"&asc="+dataParams.sortAsc;
		if(searchParams.id!==undefined&&searchParams.id>0) {
			result+="&id="+searchParams.id;
		}
		if(searchParams.pair!==undefined&&searchParams.pair!=="") {
			result+="&pair="+searchParams.pair;
		}
		if(searchParams.course!==undefined&&searchParams.course!=="") {
			result+="&course="+searchParams.course;
		}
		if(searchParams.name!==undefined&&searchParams.name!=="") {
			result+="&name="+searchParams.name;
		}
		console.log(result);
		return this.http.doGet(result);
	}

	count(params: LectionSearchParams): Observable<number> {
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
		if(params.course!==undefined&&params.course!=="") {
			result+=(first?"&":"?")+"course="+params.course;
			first=true;
		}
		if(params.name!==undefined&&params.name!=="") {
			result+=(first?"&":"?")+"name="+params.name;
		}
		console.log(result);
		return this.http.doGet(result);
	}
}
