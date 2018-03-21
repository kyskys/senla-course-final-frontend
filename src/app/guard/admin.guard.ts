import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from '@angular/core';
import {RoleService} from '../service/role.service';
 
 @Injectable()
export class AdminGuard implements CanActivate{

	constructor(private roleService: RoleService, private router : Router) {

	}
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        return !this.roleService.hasRoles([this.roleService.admin]);
    }
}