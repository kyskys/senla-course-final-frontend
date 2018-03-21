import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Rx";
import {UserDetails} from '../entity/UserDetails';
import {RoleEnum} from '../entity/RoleEnum';

export class UserService {
	url: string = "http://localhost:8080/webapp/api/user/";

	constructor(private http: HttpService) {

	}

	getCurrentUserName():Observable<string> {
		return this.http.doGet(this.url+"name");
	}

	getCurrentUserRole():Observable<string> {
		return this.http.doGet(this.url+"role")
	}

	getUserDetails():Observable<UserDetails> {
		return this.http.doGet(this.url+"profile/details/");
	}

	updateUserDetails(body: UserDetails):Observable<UserDetails> {
		return this.http.doPost(this.url+"profile/details/", body);
	}

	loadRole():Observable<any> {
		return this.http.doGet(this.url+"role");
	}
}