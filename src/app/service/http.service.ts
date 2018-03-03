import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Message} from '../entity/message';

@Injectable()
export class HttpService{

    constructor(private http: HttpClient, private auth: AuthService){

     }
      
    setAuthHeader() {
    	const options = {
    		headers: new HttpHeaders({
    			'Auth': this.auth.getToken()
    		})
    	}
        return options;
    }

    doGet(url: string):any {
        return this.http.get(url, this.setAuthHeader());
    }

    doPost(url: string, body):any {
    	return this.http.post(url, body, this.setAuthHeader());
    }
    
}