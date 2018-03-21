import { Component, OnInit } from '@angular/core';
import {UserDetails} from '../entity/UserDetails';
import {HttpService} from '../service/http.service';
import {UserService} from '../service/user.service';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit{

	details: UserDetails = new UserDetails();
  service: UserService = new UserService(this.http);
  namepat: RegExp = /^$|^[A-Za-z]+ [A-Za-z]+$/;
  emailpat: RegExp = /^$|^\w+@\w+\.\w+$/;
  detform: FormGroup;

  ngOnInit() {
    this.detform = this.formBuilder.group({
      'name': new FormControl('', Validators.compose([Validators.maxLength(45), Validators.pattern(this.namepat)])),
      'phone': new FormControl(''),
      'email': new FormControl('',Validators.compose([Validators.maxLength(45), Validators.pattern(this.emailpat)])),
        });
  }

  constructor(private http: HttpService,  private messageService: MessageService, private formBuilder: FormBuilder) {
      this.getDetails();
   }

  getDetails() {
  this.service.getUserDetails().subscribe(
    (data:UserDetails)=> {
      this.details=data;
    },error => {
      this.messageService.add({severity:'error',summary:'Error', detail:'Something happened...'});
    }
  );
}

updateDetails() {
    let details = new UserDetails;
    details.email=this.detform.value.email;
    details.name=this.detform.value.name;
    details.number=this.detform.value.phone;
    this.service.updateUserDetails(details).subscribe(
      data => {
        this.messageService.add({severity:'success',summary:'Success', detail:'Details updated'});
        this.details=data;
        localStorage.setItem('currentUser',data.name);
      }, error => {
        this.messageService.add({severity:'error',summary:'Error', detail:'Something happened...'});
      });
  }

  getEmail():string {
    return this.details.email;
  }

  getNumber():string {
    return this.details.number;
  }

  getName():string {
    return this.details.name;
  }

}
