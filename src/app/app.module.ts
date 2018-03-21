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
import { CardGuard } from './guard/card.guard';
import { AdminGuard } from './guard/admin.guard';
import { LecturerGuard } from './guard/lecturer.guard';
import { StudentGuard } from './guard/student.guard';
import { AuthService } from './service/auth.service';
import { RoleService } from './service/role.service';
import { RegisterComponent } from './register/register.component';
import { CourseMainComponent } from './course.main/course.main.component';
import { AppDataTableModule } from './data-table';
import { CourseTableComponent } from './course/table/table.component';
import { LectionTableComponent } from './lection/table/table.component';
import { GroupTableComponent } from './group/table/table.component';
import { LecturerTableComponent } from './lecturer/table/table.component';
import { MarkTableComponent } from './mark/table/table.component';
import { LectionCardComponent } from './lection/card/card.component';
import { GroupCardComponent } from './group/card/card.component';
import {DropdownModule} from 'primeng/dropdown';
import {GrowlModule} from 'primeng/growl';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PairCardComponent } from './pair/card/card.component';
import { PairTableComponent } from './pair/table/table.component';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import { CourseCardComponent } from './course/card/card.component';
import { TimetableComponent } from './timetable/timetable.component';
import {KeyFilterModule} from 'primeng/keyfilter';
import { ReactiveFormsModule } from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import {InputMaskModule} from 'primeng/inputmask';
import {RadioButtonModule} from 'primeng/radiobutton';
import { StudentTableComponent } from './student/table/table.component';

const routes: Routes =[
    { path: '', component: AuthorisationComponent},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent,},
    {path: 'courses', component: CourseTableComponent, canActivate: [AuthGuard, StudentGuard]},
    {path: 'lections', component: LectionTableComponent, canActivate: [AuthGuard, StudentGuard]},
    {path: 'groups', component: GroupTableComponent, canActivate: [AuthGuard,StudentGuard]},
    {path: 'pairs', component: PairTableComponent, canActivate: [AuthGuard, StudentGuard]},
    {path: 'lecturers', component: LecturerTableComponent, canActivate: [AuthGuard, StudentGuard,LecturerGuard]},
    {path: 'students', component: StudentTableComponent, canActivate: [AuthGuard, StudentGuard]},
    {path: 'course',component: CourseCardComponent, canActivate: [AuthGuard, CardGuard]},
    {path: 'lection',component: LectionCardComponent, canActivate: [AuthGuard, CardGuard]},
    {path: 'group',component: GroupCardComponent, canActivate: [AuthGuard, CardGuard]},
    {path: 'pair',component: PairCardComponent, canActivate: [AuthGuard, CardGuard]},
    {path: 'timetable',component: TimetableComponent, canActivate: [AuthGuard]},
    {path: 'marks',component: MarkTableComponent, canActivate: [AuthGuard, AdminGuard, LecturerGuard]},
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
    GroupTableComponent,
    LecturerTableComponent,
    MarkTableComponent,
    LectionCardComponent,
    GroupCardComponent,
    PairCardComponent,
    PairTableComponent,
    CourseCardComponent,
    TimetableComponent,
    StudentTableComponent,
  ],
  imports: [
    RadioButtonModule,
    InputMaskModule,
    PanelModule,
    ReactiveFormsModule,
    KeyFilterModule,
    DialogModule,
    CalendarModule,
    GrowlModule,
    ButtonModule,
    TableModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppDataTableModule,
    DropdownModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard,AuthService,RoleService,CardGuard,AdminGuard,LecturerGuard,StudentGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
