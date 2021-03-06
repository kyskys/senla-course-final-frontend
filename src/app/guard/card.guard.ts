import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from '@angular/core';
 
 @Injectable()
export class CardGuard implements CanActivate{

	constructor(private router : Router) {

	}
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
    	if(route.queryParams['id']!==undefined) {
    		if(route.queryParams['mode']==='edit'||route.queryParams['mode']==='view') {
    			return true;
    		}
    	} else if(route.queryParams['mode']==='create') {
    		return true;
    	} 
    	return false;
    }
}