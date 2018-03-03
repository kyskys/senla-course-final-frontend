import { Component, OnInit } from '@angular/core';
import {UserDetails} from '../entity/UserDetails';
import {HttpService} from '../service/http.service';
import {Msg} from '../entity/Msg';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
   providers: [
  HttpService,
  ]
})
export class ProfileComponent implements OnInit {

	name: string;
	email: string;
  number: number;
	details: UserDetails = new UserDetails();
  
  constructor(private service: HttpService) { }

  ngOnInit() {
  }

  getDetails() {
  this.service.doGet("http://localhost:8080/webapp/api/profile").subscribe(
    (msg:UserDetails)=> {
      this.details=msg;
      this.name=this.details.name;
      this.email=this.details.email;
      this.number=this.details.number;
    },error => {
    this.name=error;
    }
  );
}

}
