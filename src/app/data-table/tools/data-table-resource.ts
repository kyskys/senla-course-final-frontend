import { DataTableParams } from '../components/types';
import {HttpService} from '../../service/http.service';
import { ReflectiveInjector } from '@angular/core';
import {Observable} from 'rxjs';
import {SearchableService} from '../../search/SearchableService';


export class DataTableResource<T,R> {

    constructor(private items: T[], private http: HttpService, private searchService: SearchableService<R>) { }

    query(dataParams: DataTableParams, searchParams: R, filter?: (item: T, index: number, items: T[]) => boolean): Observable<T[]> {

        let result: T[] = [];

        if (filter) {
            result = this.items.filter(filter);
        } else {
            result = this.items.slice(); // shallow copy to use for sorting instead of changing the original
        }
         return this.searchService.search(searchParams, dataParams);
    }


count(searchParams: R): Observable<number> {
        return this.searchService.count(searchParams);
    }
    
}
