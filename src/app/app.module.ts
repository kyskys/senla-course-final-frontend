import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthorisationComponent } from './authorisation/authorisation.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';
import {AuthService} from './service/auth.service';
import { RegisterComponent } from './register/register.component';
import { CourseMainComponent } from './course.main/course.main.component';
import { DataTableModule } from './data-table';
import { CourseTableComponent } from './course/table/table.component';

const routes: Routes =[
    { path: '', component: AuthorisationComponent},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent},
    {path: 'course', component: CourseTableComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthorisationComponent,
    ProfileComponent,
    RegisterComponent,
    CourseMainComponent,
    CourseTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    DataTableModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
