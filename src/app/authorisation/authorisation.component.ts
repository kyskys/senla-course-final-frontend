import { Component, OnInit } from '@angular/core';
import {HttpService} from '../service/http.service';
import {UserService} from '../service/user.service';
import {AuthService} from '../service/auth.service';
import {RoleService} from '../service/role.service';
import {HttpParams,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserCreds} from '../entity/UserCreds';
import {TokenMessage} from '../entity/TokenMessage';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/components/common/messageservice';
import {Md5} from 'ts-md5';
import {PasswordEncoder} from '../util/PasswordEncoder';


@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.css'],
  providers: [
  AuthService
  ]
})
export class AuthorisationComponent implements OnInit {

	message:string;
  codeMessage: TokenMessage = new TokenMessage();
  error:string;
  userService: UserService = new UserService(this.service);
  loginform: FormGroup;
  
  constructor(private service: HttpService, private router: Router,private auth:AuthService, private messageService: MessageService, private formBuilder: FormBuilder) {
    this.auth.setToken('');
  }

  redirectToProfile() {
  this.messageService.add({severity:'success',summary:'Successfully logined',detail:'Redirecting...'});
      this.router.navigate(['courses']);
  }

  redirectToRegister() {
    this.router.navigate(['register']);
  }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
            'login': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required)
        });
  }

  getUser() :UserCreds  {
  	let user: UserCreds = new UserCreds();
  	user.login=this.loginform.value.login;
  	user.password=PasswordEncoder.encodePassword(this.loginform.value.password);
    return user;
  }
  
  authorize() {
    let user: UserCreds = this.getUser();
  	this.service.doPost("http://localhost:8080/webapp/login", user).subscribe(
      (msg:TokenMessage)=> {
      this.codeMessage=msg;
      if(this.codeMessage.code==3000) {
      this.auth.setToken(this.codeMessage.token);
      this.userService.getCurrentUserName().subscribe(
      (data:any) => {
      localStorage.setItem('currentUser',data.name);
      this.userService.loadRole().subscribe(data => {
      localStorage.setItem('role',data.role);
      this.redirectToProfile();
      });
      });
    } else if (this.codeMessage.code==3001) {
      this.messageService.add({severity:'warning',summary:'Wrong password'});
    } else if (this.codeMessage.code=3002) {
      this.messageService.add({severity:'warning',summary:'No such login'});
    }
     },error => {
       this.messageService.add({severity:'error',summary:'Error during login', detail:'Something happened...'});
     }
     );
    
  }
  }

