import {SearchableService} from '../search/SearchableService';
import {LectionSearchParams} from'../search/params/LectionSearchParams';
import {DataTableParams} from '../data-table';
import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Rx";
import {LectionMainDto} from '../entity/LectionMainDto';
import {CourseLectionDto} from '../entity/CourseLectionDto';
import {LectionDto} from '../entity/LectionDto';
import {LectionUpdateDto} from '../entity/LectionUpdateDto';
import {DictionaryItem} from '../entity/DictionaryItem';


export class LectionService implements SearchableService<LectionSearchParams,LectionMainDto> {
	url: string = "http://localhost:8080/webapp/api/lection/";

	constructor(private http: HttpService) {

	}

	get(id: number):Observable<LectionMainDto> {
		let resultUrl=this.url+id+"/";
		return this.http.doGet(resultUrl);
	}

	create(entity: LectionDto):Observable<LectionMainDto> {
		return this.http.doPut(this.url,entity);
	}


	delete(id: number):Observable<any> {
		return this.http.doDelete(this.url+id);
	}

	update(entity:LectionUpdateDto, id:number):Observable<any> {
		return this.http.doPost(this.url+id,entity);
	}

	getLectionsByCourseId(id: number): Observable<CourseLectionDto[]> {
		let result: string = this.url+"course/"+id;
		return this.http.doGet(result);
	}

	getLectionsWithoutCourse(): Observable<CourseLectionDto[]> {
		let result: string = this.url+"course/";
		return this.http.doGet(result);
	}

	getDictionary():Observable<DictionaryItem[]> {
		return this.http.doGet(this.url+"dictionary");
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
