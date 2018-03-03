import { Component, OnInit } from '@angular/core';
import {HttpService} from '../service/http.service';
import {AuthService} from '../service/auth.service';
import {HttpParams,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserCreds} from '../entity/UserCreds';
import {Message} from '../entity/message';

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.css'],
  providers: [
  HttpService,AuthService
  ]
})
export class AuthorisationComponent implements OnInit {


	login:string;
	password:string;
	message:string;
  codeMessage: Message = new Message();
  error:string;
  
  constructor(private service: HttpService, private router: Router,private auth:AuthService) {
    this.auth.setToken('');
  }

  redirectToProfile() {
  this.router.navigate(['course']);
  }

  ngOnInit() {
  }

  getUser() :UserCreds  {
  	let user: UserCreds = new UserCreds();
  	user.login=this.login;
  	user.password=this.password;
    return user;
  }
  
  check() {
    let user: UserCreds = this.getUser();
  	this.service.doPost("http://localhost:8080/webapp/login", user).subscribe(
      (msg:Message)=> {
      this.codeMessage=msg;
      if(this.codeMessage.code==3000) {
      this.auth.setToken(this.codeMessage.token);
      this.redirectToProfile();
    } else if (this.codeMessage.code==3001) {
      this.message="wrong password";
    } else if (this.codeMessage.code=3002) {
      this.message="no such login";
    }
     },error => {
       this.message=error;
     }
     );
    
  }
  }

