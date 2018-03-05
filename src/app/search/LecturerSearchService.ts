import {SearchableService} from './SearchableService';
import {LecturerSearchParams} from'./params/LecturerSearchParams';
import {DataTableParams} from '../data-table';
import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Rx";
import {LecturerMainDto} from '../entity/LecturerMainDto';

export class LecturerSearchService implements SearchableService<LecturerSearchParams,LecturerMainDto> {
	url: string = "http://localhost:8080/webapp/api/lecturer/";

	constructor(private http: HttpService) {

	}


	search(searchParams: LecturerSearchParams, dataParams: DataTableParams): Observable<LecturerMainDto[]> {
		let result: string = this.url;
		result+="search?limit="+dataParams.limit+"&sort="+dataParams.sortBy+"&offset="+dataParams.offset+"&asc="+dataParams.sortAsc;
		if(searchParams.id!==undefined&&searchParams.id>0) {
			result+="&id="+searchParams.id;
		}
		if(searchParams.email!==undefined&&searchParams.email!=="") {
			result+="&email="+searchParams.email;
		}
		if(searchParams.name!==undefined&&searchParams.name!=="") {
			result+="&name="+searchParams.name;
		}
		if(searchParams.number!==undefined&&searchParams.number>0) {
			result+="&number="+searchParams.number;
		}
		console.log(result);
		return this.http.doGet(result);
	}

	count(params: LecturerSearchParams): Observable<number> {
		let result: string = this.url+"count";
		let first: boolean=false;
		if(params.id!==undefined&&params.id>0) {
			result+="?id="+params.id;
			first=true;
		}
		if(params.email!==undefined&&params.email!=="") {
			result+=(first?"&":"?")+"email="+params.email;
			first=true;
		}
		if(params.name!==undefined&&params.name!=="") {
			result+=(first?"&":"?")+"name="+params.name;
			first=true;
		}
		if(params.number!==undefined&&params.number>0) {
			result+=(first?"&":"?")+"number="+params.number;
		}
		console.log(result);
		return this.http.doGet(result);
	}
}
