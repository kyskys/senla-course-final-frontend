import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {CourseService} from '../../service/course.service';
import {LectionService} from '../../service/lection.service';
//import {PairService} from '../../service/pair.service';
import {LectionDto} from '../../entity/LectionDto';
import {LectionMainDto} from '../../entity/LectionMainDto';
import {LectionUpdateDto} from '../../entity/LectionUpdateDto';
import {Router} from '@angular/router';
import {SelectedItemDto} from'../../entity/SelectedItemDto';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class LectionCardComponent {
courseService: CourseService = new CourseService(this.http);
  lectionService: LectionService = new LectionService(this.http);
  //pairService: PairService = new PairService(this.http);
  id: number;
  name: string;
  course: string;
	mode: string;
	entity: LectionMainDto;
  courses: SelectItem[] =[];
  selectedCourse: SelectItem;

  constructor(private activateRoute: ActivatedRoute, private http: HttpService, private router: Router) { 
activateRoute.queryParams.subscribe(params=> {
      this.id=params['id'];
      this.mode=params['mode'];
      this.courseService.getAll().subscribe(data => {
      data.map(course => {
        this.courses.push({label:course.name,value:course.id});
      });
    });
      if(this.id>0) {
        this.reloadItems();
      }
    });
  }

isViewMode():boolean{
    return this.mode==="view";
  }

  isEditMode():boolean{
    return this.mode==="edit";
  }

  isCreateMode():boolean{
    return this.mode==="create";
  }

  setEditMode() {
    this.mode="edit";
  }

  setViewMode() {
    this.mode="view";
  }

  reloadItems() {
    this.lectionService.get(this.id).subscribe(data => {
      this.entity=data;
      this.name='';
    });
  }

 checkPageMode():boolean {
    if(this.mode==="edit"||this.mode==="view") {
      return true;
    }
    if(this.mode==="create") {
      return false;
    }
  }

  createLection() {
    let newLection:LectionDto = new LectionDto();
    newLection.name=this.name;
    this.lectionService.create(newLection).subscribe(
      data=> {
        this.entity=data;
        this.id=this.entity.id;
        this.setViewMode();
        this.reloadItems();
      });
  }

updateLection() {
    let updateLection:LectionUpdateDto = new LectionUpdateDto();
    updateLection.course=Number(this.selectedCourse);
    updateLection.name=this.name;
    this.lectionService.update(updateLection,this.id).subscribe(data => this.reloadItems());
  }

  goToRegistry() {
    this.router.navigate(['lections']);
  }

  getName():string {
    return this.entity===undefined?"":this.entity.name;
  }

  getCourse():string{
    return this.entity===undefined?"":this.entity.course;
  }


}
