import {SearchableService} from '../search/SearchableService';
import {MarkSearchParams} from'../search/params/MarkSearchParams';
import {DataTableParams} from '../data-table';
import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Rx";
import {MarkMainDto} from '../entity/MarkMainDto';
import {MarkStudentDto} from '../entity/MarkStudentDto';
import {MarkDto} from '../entity/MarkDto';


export class MarkService implements SearchableService<MarkSearchParams,MarkMainDto> {
	url: string = "http://localhost:8080/webapp/api/mark/";

	constructor(private http: HttpService) {

	}

	get(id: number):Observable<MarkMainDto> {
		let resultUrl=this.url+id+"/";
		return this.http.doGet(resultUrl);
	}

	getAll():Observable<MarkMainDto[]> {
		return this.http.doGet(this.url);
	}

	create(entity: MarkDto):Observable<MarkMainDto> {
		return this.http.doPut(this.url,entity);
	}

	delete(id: number):Observable<any> {
		return this.http.doDelete(this.url+id);
	}

	update(entity:MarkDto, id:number):Observable<any> {
		return this.http.doPost(this.url+id,entity);
	}
	
	addStudentsToMark(array: any, id:number):Observable<any> {
		return this.http.doPost(this.url+id+"/add/student", array);
	}

	getMarksByPairId(id:number):Observable<MarkMainDto[]> {
		return this.http.doGet(this.url+"pair/"+id);
	}

	getMarksByCurrentStudent(searchParams: MarkSearchParams, dataParams: DataTableParams):Observable<MarkStudentDto[]> {
		let result: string = this.url+"search/student";
		result+="?limit="+dataParams.limit+"&sort="+dataParams.sortBy+"&offset="+dataParams.offset+"&asc="+dataParams.sortAsc;
		if(searchParams.id!==undefined&&searchParams.id>0) {
			result+="&id="+searchParams.id;
		}
		if(searchParams.pair!==undefined&&searchParams.pair!=="") {
			result+="&pair="+searchParams.pair;
		}
		return this.http.doGet(result);
	}

	getMarksCountByCurrentStudent(params: MarkSearchParams):Observable<number> {
		let result: string = this.url+"search/student/count";
		let first: boolean=false;
		if(params.id!==undefined&&params.id>0) {
			result+="?id="+params.id;
			first=true;
		}
		if(params.pair!==undefined&&params.pair!=="") {
			result+=(first?"&":"?")+"pair="+params.pair;
			first=true;
		}
		return this.http.doGet(result);

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
