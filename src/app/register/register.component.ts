import { Component, OnInit } from '@angular/core';
import {HttpService} from '../service/http.service';
import {Router} from '@angular/router';
import {User} from '../entity/User';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/components/common/messageservice';
import {Md5} from 'ts-md5';
import {PasswordEncoder} from '../util/PasswordEncoder';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

	namepat: RegExp = /^[A-Za-z]+ [A-Za-z]+$/;
	loginpat: RegExp = /^[A-Za-z0-9]{3,16}$/;
	emailpat: RegExp = /^$|^\w+@\w+\.\w+$/;
	regform: FormGroup;

  constructor(private service: HttpService, private router: Router, private messageService: MessageService, private formBuilder: FormBuilder) { 
  }

	ngOnInit() {
		this.regform = this.formBuilder.group({
			'name': new FormControl('', Validators.compose([Validators.required,Validators.maxLength(45), Validators.pattern(this.namepat)])),
            'login': new FormControl('', Validators.compose([Validators.required,Validators.pattern(this.loginpat)])),
            'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(8),Validators.maxLength(45)])),
            'phone': new FormControl(''),
            'email': new FormControl('',Validators.compose([Validators.maxLength(45),Validators.pattern(this.emailpat)])),
            'role': new FormControl('student')
        });
	}

	getUser(): User {
		let user: User = new User();
		user.email=this.regform.value.email;
		user.name=this.regform.value.name;
		user.password=PasswordEncoder.encodePassword(this.regform.value.password);
		user.number=this.regform.value.phone;
		user.login=this.regform.value.login;
    user.role=this.regform.value.role;
		return user;
	}

 redirectToLogin() {
      this.router.navigate(['']);
  }

  register() {
   let user: User = this.getUser();

  	this.service.doPost("http://localhost:8080/webapp/user/registrate", user).subscribe(
  		data => {
        if(data.code===3003) {
          this.messageService.add({severity:'warn',summary:'Warning',detail:'Login already exist'});
        } else if(data.code===3002) {
          this.messageService.add({severity:'success',summary:'Successfully registered',detail:'Login with your data'});
      this.redirectToLogin();
        }
  	},error => {
  		this.messageService.add({severity:'error',summary:'Error during registration', detail:'Something happened...'});
  	});
  }
}
