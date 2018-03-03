import {DataTableParams} from '../data-table';

export interface SearchableService<R> {
	search(searchParams: R, dataParams: DataTableParams): string;
	count(searchParams: R): string;
}
