import {SearchableService} from '../search/SearchableService';
import {CourseSearchParams} from'../search/params/CourseSearchParams';
import {DataTableParams} from '../data-table';
import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Rx";
import {CourseMainDto} from '../entity/CourseMainDto';
import {CourseDto} from '../entity/CourseDto';

export class CourseService implements SearchableService<CourseSearchParams,CourseMainDto> {
	url: string = "http://localhost:8080/webapp/api/course/";

	constructor(private http: HttpService) {

	}

	get(id: number):Observable<CourseMainDto> {
		let resultUrl=this.url+id+"/";
		return this.http.doGet(resultUrl);
	}

	create(entity: CourseDto):Observable<CourseMainDto> {
		return this.http.doPost(this.url,entity);
	}

	delete(id: number) {
		this.http.doDelete(this.url+"?id="+id);
	}

	update(entity:CourseDto, id:number) {
		this.http.doPost(this.url+"?id="+id,entity);
	}

	search(searchParams: CourseSearchParams, dataParams: DataTableParams): Observable<CourseMainDto[]> {
		let resultUrl: string = this.url;
		resultUrl+="search?limit="+dataParams.limit+"&sort="+dataParams.sortBy+"&offset="+dataParams.offset+"&asc="+dataParams.sortAsc;
		if(searchParams.id!==undefined&&searchParams.id>0) {
			resultUrl+="&id="+searchParams.id;
		}
		if(searchParams.lecturer!==undefined&&searchParams.lecturer!=="") {
			resultUrl+="&lecturer="+searchParams.lecturer;
		}
		if(searchParams.name!==undefined&&searchParams.name!=="") {
			resultUrl+="&name="+searchParams.name;
		}
		return this.http.doGet(resultUrl);
	}

	count(params: CourseSearchParams): Observable<number> {
		let resultUrl: string = this.url+"count";
		let first: boolean=false;
		if(params.id!==undefined&&params.id>0) {
			resultUrl+="?id="+params.id;
			first=true;
		}
		if(params.lecturer!==undefined&&params.lecturer!=="") {
			resultUrl+=(first?"&":"?")+"lecturer="+params.lecturer;
			first=true;
		}
		if(params.name!==undefined&&params.name!=="") {
			resultUrl+=(first?"&":"?")+"name="+params.name;
		}
		return this.http.doGet(resultUrl);
	}
}
