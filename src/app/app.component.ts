import { Component } from '@angular/core';
import {AuthService} from './service/auth.service';
import {HttpService} from './service/http.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/components/common/messageservice';
import {RoleService} from './service/role.service';
import {RoleEnum} from './entity/RoleEnum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, HttpService, MessageService]
})


export class AppComponent {
  roleService: RoleService = new RoleService();

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
  	this.route.navigate(['lecturers']);
  }

  goToStudent() {
    this.route.navigate(['students']);
  }

  goToPair() {
    this.route.navigate(['pairs']);
  }

  goToTimetable() {
    this.route.navigate(['timetable']);
  }

  goToMarks() {
    this.route.navigate(['marks']);
  }

  logout() {
  	this.route.navigate(['']);
  }

}
