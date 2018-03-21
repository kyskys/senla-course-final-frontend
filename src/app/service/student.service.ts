import {SearchableService} from '../search/SearchableService';
import {StudentSearchParams} from'../search/params/StudentSearchParams';
import {DataTableParams} from '../data-table';
import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Rx";
import {StudentMainDto} from '../entity/StudentMainDto';
import {GroupStudentDto} from '../entity/GroupStudentDto';
import {DictionaryItem} from '../entity/DictionaryItem';


export class StudentService implements SearchableService<StudentSearchParams,StudentMainDto> {
	url: string = "http://localhost:8080/webapp/api/student/";

	constructor(private http: HttpService) {

	}

	get(id: number):Observable<StudentMainDto> {
		let resultUrl=this.url+id+"/";
		return this.http.doGet(resultUrl);
	}

	getDictionary():Observable<DictionaryItem[]> {
		return this.http.doGet(this.url+"dictionary");
	}

	getStudentsByGroupId(id: number): Observable<GroupStudentDto[]> {
		let result: string = this.url+"group/"+id;
		return this.http.doGet(result);
	}

	getStudentsWithoutGroup(): Observable<GroupStudentDto[]> {
		let result: string = this.url+"group/";
		return this.http.doGet(result);
	}

	search(searchParams: StudentSearchParams, dataParams: DataTableParams): Observable<StudentMainDto[]> {
		let result: string = this.url;
		result+="search?limit="+dataParams.limit+"&sort="+dataParams.sortBy+"&offset="+dataParams.offset+"&asc="+dataParams.sortAsc;
		if(searchParams.id!==undefined&&searchParams.id>0) {
			result+="&id="+searchParams.id;
		}
		if(searchParams.name!==undefined&&searchParams.name!=="") {
			result+="&name="+searchParams.name;
		}
		if(searchParams.email!==undefined&&searchParams.email!=="") {
			result+="&email="+searchParams.email;
		}
		if(searchParams.number!==undefined&&searchParams.number!=="") {
			result+="&number="+searchParams.number;
		}
		if(searchParams.group!==undefined&&searchParams.group!=="") {
			result+="&group="+searchParams.group;
		}
		return this.http.doGet(result);
	}

	count(params: StudentSearchParams): Observable<number> {
		let result: string = this.url+"count";
		let first: boolean=false;
		if(params.id!==undefined&&params.id>0) {
			result+="?id="+params.id;
			first=true;
		}
		if(params.name!==undefined&&params.name!=="") {
			result+=(first?"&":"?")+"name="+params.name;
			first=true;
		}
		if(params.email!==undefined&&params.email!=="") {
			result+=(first?"&":"?")+"email="+params.email;
			first=true;
		}
		if(params.number!==undefined&&params.number!=="") {
			result+=(first?"&":"?")+"number="+params.number;
			first=true;
		}
		if(params.group!==undefined&&params.group!=="") {
			result+=(first?"&":"?")+"group="+params.group;
			first=true;
		}
		return this.http.doGet(result);
	}
}
