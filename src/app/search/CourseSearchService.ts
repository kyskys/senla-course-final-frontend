import {SearchableService} from './SearchableService';
import {CourseSearchParams} from'./params/CourseSearchParams';
import {DataTableParams} from '../data-table';

export class CourseSearchService implements SearchableService<CourseSearchParams> {
	url: string = "http://localhost:8080/webapp/api/course/";

	search(searchParams: CourseSearchParams, dataParams: DataTableParams): string {
		let result: string = this.url;
		result+="search?limit="+dataParams.limit+"&offset="+dataParams.offset+"&asc="+dataParams.sortAsc;
		if(searchParams.id!==undefined&&searchParams.id!== "") {
			result+="&id="+searchParams.id;
		}
		if(searchParams.lecturer!==undefined&&searchParams.lecturer!=="") {
			result+="&lecturer="+searchParams.lecturer;
		}
		if(searchParams.name!==undefined&&searchParams.name!=="") {
			result+="&name="+searchParams.name;
		}
		console.log(result);
		return result;
	}
	count(params: CourseSearchParams): string {
		let result: string = this.url+"count";
		let first: boolean=false;
		if(params.id!==undefined&&params.id!== "") {
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
		console.log(result);
		return result;
	}
}
