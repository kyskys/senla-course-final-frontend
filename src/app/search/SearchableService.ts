import {DataTableParams} from '../data-table';
import {Observable} from "rxjs/Rx";

export interface SearchableService<R,T> {
	search(searchParams: R, dataParams: DataTableParams): Observable<T[]>;
	count(searchParams: R): Observable<number>;
}
