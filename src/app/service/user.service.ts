import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Rx";

export class UserService {
	url: string = "http://localhost:8080/webapp/api/user/";

	constructor(private http: HttpService) {

	}

	getCurrentUserName():Observable<string> {
		return this.http.doGet(this.url+"name");
	}
}