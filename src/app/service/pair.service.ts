import {SearchableService} from '../search/SearchableService';
import {PairSearchParams} from'../search/params/PairSearchParams';
import {DataTableParams} from '../data-table';
import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Rx";
import {PairMainDto} from '../entity/PairMainDto';
import {PairDto} from '../entity/PairDto';
import {DictionaryItem} from '../entity/DictionaryItem';


export class PairService implements SearchableService<PairSearchParams,PairMainDto> {
	url: string = "http://localhost:8080/webapp/api/pair/";

	constructor(private http: HttpService) {

	}

	get(id: number):Observable<PairMainDto> {
		let resultUrl=this.url+id+"/";
		return this.http.doGet(resultUrl);
	}

	getAll():Observable<PairMainDto[]> {
		return this.http.doGet(this.url);
	}

	create(entity: PairDto):Observable<PairMainDto> {
		return this.http.doPut(this.url,entity);
	}

	delete(id: number):Observable<any> {
		return this.http.doDelete(this.url+id);
	}

	update(entity:PairDto, id:number):Observable<any> {
		return this.http.doPost(this.url+id,entity);
	}

	getDictionary():Observable<DictionaryItem[]> {
		return this.http.doGet(this.url+"dictionary");
	}

	getPairTimeDictionary():Observable<DictionaryItem[]> {
		return this.http.doGet(this.url+"time/dictionary");
	}

	getTimetableByWeek(day:string, group: number) {
		return this.http.doGet(this.url+"timetable/"+group+"?day="+day);
	}

	addGroupsToPair(array: any, id:number):Observable<any> {
		return this.http.doPost(this.url+id+"/add/group", array);
	}

	search(searchParams: PairSearchParams, dataParams: DataTableParams): Observable<PairMainDto[]> {
		let result: string = this.url;
		result+="search?limit="+dataParams.limit+"&sort="+dataParams.sortBy+"&offset="+dataParams.offset+"&asc="+dataParams.sortAsc;
		if(searchParams.id!==undefined&&searchParams.id>0) {
			result+="&id="+searchParams.id;
		}
		if(searchParams.date!==undefined&&searchParams.date!=="Invalid date") {
			result+="&date="+searchParams.date;
		}
		if(searchParams.lection!==undefined&&searchParams.lection!=="") {
			result+="&lection="+searchParams.lection;
		}
		if(searchParams.name!==undefined&&searchParams.name!=="") {
			result+="&name="+searchParams.name;
		}
		console.log(result);
		return this.http.doGet(result);
	}

	count(params: PairSearchParams): Observable<number> {
		let result: string = this.url+"count";
		let first: boolean=false;
		if(params.id!==undefined&&params.id>0) {
			result+="?id="+params.id;
			first=true;
		}
		if(params.date!==undefined&&params.date!=="Invalid date") {
			result+=(first?"&":"?")+"date="+params.date;
			first=true;
		}
		if(params.lection!==undefined&&params.lection!=="") {
			result+=(first?"&":"?")+"lection="+params.lection;
			first=true;
		}
		if(params.name!==undefined&&params.name!=="") {
			result+=(first?"&":"?")+"name="+params.name;
		}
		return this.http.doGet(result);
	}
}
