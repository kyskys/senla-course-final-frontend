import {RoleEnum} from '../entity/RoleEnum';

export class RoleService {

	admin: RoleEnum = RoleEnum.ADMIN;
	lecturer: RoleEnum = RoleEnum.LECTURER;
	student: RoleEnum = RoleEnum.STUDENT;
	
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