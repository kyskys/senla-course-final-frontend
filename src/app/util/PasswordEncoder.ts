import {Md5} from 'ts-md5';

export class PasswordEncoder {

	private static salt: string = "test";
	
	constructor() {

	}

	static encodePassword(pass: string): string {
		return Md5.hashStr(pass+this.salt).toString();
	}
}