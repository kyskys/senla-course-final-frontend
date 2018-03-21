import {SearchableService} from '../search/SearchableService';
import {GroupSearchParams} from'../search/params/GroupSearchParams';
import {DataTableParams} from '../data-table';
import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Rx";
import {GroupMainDto} from '../entity/GroupMainDto';
import {GroupDto} from '../entity/GroupDto';
import {DictionaryItem} from '../entity/DictionaryItem';


export class GroupService implements SearchableService<GroupSearchParams,GroupMainDto> {
	url: string = "http://localhost:8080/webapp/api/group/";

	constructor(private http: HttpService) {

	}

	get(id: number):Observable<GroupMainDto> {
		let resultUrl=this.url+id+"/";
		return this.http.doGet(resultUrl);
	}

	getAll():Observable<GroupMainDto[]> {
		return this.http.doGet(this.url+"all");
	}

	create(entity: GroupDto):Observable<GroupMainDto> {
		return this.http.doPut(this.url,entity);
	}

	delete(id: number):Observable<any> {
		return this.http.doDelete(this.url+id);
	}

	update(entity:GroupDto, id:number):Observable<any> {
		return this.http.doPost(this.url+id,entity);
	}
	
	addStudentsToGroup(array: any, id:number):Observable<any> {
		return this.http.doPost(this.url+id+"/add/student", array);
	}

	getDictionary() : Observable<DictionaryItem[]> {
		return this.http.doGet(this.url+"dictionary");
	}

	getGroupsByPairId(id: number): Observable<GroupMainDto[]> {
		let result: string = this.url+"pair/"+id;
		return this.http.doGet(result);
	}

	getGroupsWithoutPair(id: number): Observable<GroupMainDto[]> {
		let result: string = this.url+"nopair/"+id;
		return this.http.doGet(result);
	}

	search(searchParams: GroupSearchParams, dataParams: DataTableParams): Observable<GroupMainDto[]> {
		let resultUrl: string = this.url;
		resultUrl+="search?limit="+dataParams.limit+"&sort="+dataParams.sortBy+"&offset="+dataParams.offset+"&asc="+dataParams.sortAsc;
		if(searchParams.id!==undefined&&searchParams.id>0) {
			resultUrl+="&id="+searchParams.id;
		}
		if(searchParams.name!==undefined&&searchParams.name!=="") {
			resultUrl+="&name="+searchParams.name;
		}
		return this.http.doGet(resultUrl);
	}

	count(params: GroupSearchParams): Observable<number> {
		let resultUrl: string = this.url+"count";
		let first: boolean=false;
		if(params.id!==undefined&&params.id>0) {
			resultUrl+="?id="+params.id;
			first=true;
		}
		if(params.name!==undefined&&params.name!=="") {
			resultUrl+=(first?"&":"?")+"name="+params.name;
		}
		return this.http.doGet(resultUrl);
	}
}
