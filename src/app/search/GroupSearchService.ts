import {SearchableService} from './SearchableService';
import {GroupSearchParams} from'./params/GroupSearchParams';
import {DataTableParams} from '../data-table';
import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Rx";
import {GroupMainDto} from '../entity/GroupMainDto';

export class GroupSearchService implements SearchableService<GroupSearchParams,GroupMainDto> {
	url: string = "http://localhost:8080/webapp/api/group/";

	constructor(private http: HttpService) {

	}


	search(searchParams: GroupSearchParams, dataParams: DataTableParams): Observable<GroupMainDto[]> {
		let result: string = this.url;
		result+="search?limit="+dataParams.limit+"&sort="+dataParams.sortBy+"&offset="+dataParams.offset+"&asc="+dataParams.sortAsc;
		if(searchParams.id!==undefined&&searchParams.id>0) {
			result+="&id="+searchParams.id;
		}
		if(searchParams.name!==undefined&&searchParams.name!=="") {
			result+="&name="+searchParams.name;
		}
		return this.http.doGet(result);
	}

	count(params: GroupSearchParams): Observable<number> {
		let result: string = this.url+"count";
		let first: boolean=false;
		if(params.id!==undefined&&params.id>0) {
			result+="?id="+params.id;
			first=true;
		}
		if(params.name!==undefined&&params.name!=="") {
			result+=(first?"&":"?")+"name="+params.name;
		}
		return this.http.doGet(result);
	}
}
