import { Component, OnInit } from '@angular/core';
import {HttpService} from '../service/http.service';
import {Router} from '@angular/router';
import {User} from '../entity/User';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[HttpService]
})
export class RegisterComponent implements OnInit {

	name:string;
	login:string;
	email:string;
	password:string;
	number:number;
	role:string = "student";
	message:string;
	nameMessage:string;
	loginMessage:string;
	emailMessage:string;
	passwordMessage:string;
	phoneMessage:string;

	getUser(): User {
		let user: User = new User();
		user.email=this.email;
		user.name=this.name;
		user.password=this.password;
		user.number=this.number;
		user.login=this.login;
		return user;
	}

  constructor(private service: HttpService, private router: Router) { 
  }

  ngOnInit() {
  }

  register() {
 let user: User = this.getUser();
  	this.service.doPost("http://localhost:8080/webapp/register/"+this.role, user).subscribe();
  }
}
