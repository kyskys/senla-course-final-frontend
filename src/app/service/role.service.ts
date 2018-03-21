import {RoleEnum} from '../entity/RoleEnum';

export class RoleService {

	admin: RoleEnum = RoleEnum.Admin;
	lecturer: RoleEnum = RoleEnum.Lecturer;
	student: RoleEnum = RoleEnum.Student;
	
	constructor() {

	}


	hasRoles(roles:RoleEnum[]):boolean {
		let currentRole = localStorage.getItem('role');
		for(let role of roles) {
			if (role === currentRole) {
				return true;
			}
		}
		return false;
	}


}