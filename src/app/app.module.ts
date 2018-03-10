import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthorisationComponent } from './authorisation/authorisation.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { CourseGuard } from './guard/course.guard';
import { AuthService } from './service/auth.service';
import { RegisterComponent } from './register/register.component';
import { CourseMainComponent } from './course.main/course.main.component';
import { AppDataTableModule } from './data-table';
import { CourseTableComponent } from './course/table/table.component';
import { LectionTableComponent } from './lection/table/table.component';
import { HeaderComponent } from './header/header.component';
import { GroupTableComponent } from './group/table/table.component';
import { LecturerTableComponent } from './lecturer/table/table.component';
import { MarkTableComponent } from './mark/table/table.component';
import { CourseModeComponent } from './course/mode/mode.component';

const routes: Routes =[
    { path: '', component: AuthorisationComponent},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent},
    {path: 'courses', component: CourseTableComponent},
    {path: 'lection', component: LectionTableComponent},
    {path: 'group', component: GroupTableComponent},
    {path: 'lecturer', component: LecturerTableComponent},
    {path: 'mark', component: MarkTableComponent},
    {path: 'course',component: CourseModeComponent, canActivate:[CourseGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    AuthorisationComponent,
    ProfileComponent,
    RegisterComponent,
    CourseMainComponent,
    CourseTableComponent,
    LectionTableComponent,
    HeaderComponent,
    GroupTableComponent,
    LecturerTableComponent,
    MarkTableComponent,
    CourseModeComponent
  ],
  imports: [
    ButtonModule,
    TableModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppDataTableModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard,AuthService,CourseGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
