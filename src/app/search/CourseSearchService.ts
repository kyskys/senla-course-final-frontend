import {SearchableService} from './SearchableService';
import {CourseSearchParams} from'./params/CourseSearchParams';
import {DataTableParams} from '../data-table';
import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Rx";
import {CourseMainDto} from '../entity/CourseMainDto';

export class asd implements SearchableService<CourseSearchParams,CourseMainDto> {
	url: string = "http://localhost:8080/webapp/api/course/";

	constructor(private http: HttpService) {

	}


	search(searchParams: CourseSearchParams, dataParams: DataTableParams): Observable<CourseMainDto[]> {
		let result: string = this.url;
		result+="search?limit="+dataParams.limit+"&sort="+dataParams.sortBy+"&offset="+dataParams.offset+"&asc="+dataParams.sortAsc;
		if(searchParams.id!==undefined&&searchParams.id>0) {
			result+="&id="+searchParams.id;
		}
		if(searchParams.lecturer!==undefined&&searchParams.lecturer!=="") {
			result+="&lecturer="+searchParams.lecturer;
		}
		if(searchParams.name!==undefined&&searchParams.name!=="") {
			result+="&name="+searchParams.name;
		}
		return this.http.doGet(result);
	}

	count(params: CourseSearchParams): Observable<number> {
		let result: string = this.url+"count";
		let first: boolean=false;
		if(params.id!==undefined&&params.id>0) {
			result+="?id="+params.id;
			first=true;
		}
		if(params.lecturer!==undefined&&params.lecturer!=="") {
			result+=(first?"&":"?")+"lecturer="+params.lecturer;
			first=true;
		}
		if(params.name!==undefined&&params.name!=="") {
			result+=(first?"&":"?")+"name="+params.name;
		}
		return this.http.doGet(result);
	}
}
