import {HttpService} from '../service/http.service';
import {Observable} from "rxjs/Rx";

export class RegistrationService {
	url: string = "http://localhost:8080/webapp/api/";

	constructor(private http: HttpService) {

	}

	createUser():Observable<string> {
		return this.http.doGet(this.url+"name");
	}
}