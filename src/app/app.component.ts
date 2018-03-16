import { Component } from '@angular/core';
import {AuthService} from './service/auth.service';
import {HttpService} from './service/http.service';
import {Router} from '@angular/router';
import {Message} from 'primeng/components/common/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, HttpService]
})


export class AppComponent {

  isVisible(): boolean {
  	return this.auth.isAuthenticated();
  }
	constructor(private auth: AuthService, private http: HttpService, private route: Router) {
		
  	}

 getUserName() {
  	return localStorage.getItem('currentUser');
 }

  goToLection() {
  	this.route.navigate(['lections']);
  }

  goToCourse() {
  	this.route.navigate(['courses']);
  }

  goToProfile() {
  	this.route.navigate(['profile']);
  }

   goToGroup() {
  	this.route.navigate(['groups']);
  }

    goToLecturer() {
  	this.route.navigate(['lecturer']);
  }

  goToMark() {
  	this.route.navigate(['marks']);
  }

  goToPair() {
    this.route.navigate(['pairs']);
  }

  goToTimetable() {
    this.route.navigate(['timetable']);
  }

  logout() {
  	this.route.navigate(['']);
  }

}
