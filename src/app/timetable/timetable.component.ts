import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {PairGetDto} from '../entity/PairGetDto';
import {PairMainDto} from '../entity/PairMainDto';
import {PairService} from '../service/pair.service';
import {GroupService} from '../service/group.service';
import {HttpService} from '../service/http.service';
import {SelectedItemDto} from'../entity/SelectedItemDto';
import {TimetableItemDto} from'../entity/TimetableItemDto';
import {SelectItem} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css'],
  providers: [HttpService, MessageService]
})
export class TimetableComponent implements OnInit{

pairService = new PairService(this.http);
groupService = new GroupService(this.http);
days: SelectItem[] = [];
groups: SelectItem[] = [];
cols:any[];
pairs:TimetableItemDto[] = [];
rowGroupMetadata: any;
timeform: FormGroup;

  ngOnInit() {
     this.timeform = this.formBuilder.group({
            'day': new FormControl('', Validators.required),
            'group': new FormControl('', Validators.required)
        });
  }

  constructor(private http:HttpService,private messageService: MessageService, private formBuilder: FormBuilder) {
    this.generateDays();
    this.cols=[
            { field: 'date', header: 'Date' },
            { field: 'name', header: 'Pair name' },
            { field: 'lection', header: 'Lection name'},
            { field: 'startTime', header: 'Start time'},
            { field: 'endTime', header: 'End time'}
      ];
    this.groupService.getDictionary().subscribe(data => {
      data.map(group => {
        this.groups.push({label:group.name,value:group.id});
      });
    });
  }

  generateDays() {
    let startDay = moment().startOf("isoWeek");
    let endDay = moment().endOf("isoWeek");
  	for (var i = 0; i <=4; i++) {
  		this.days.push(
        {label:startDay.subtract(7,'d').format("DD/MM/YYYY")+" - "+endDay.subtract(7,'d').format("DD/MM/YYYY"),value:startDay.format("DD/MM/YYYY")});
    }
    this.days.reverse();
    startDay = moment().startOf("isoWeek");
    endDay = moment().endOf("isoWeek");
    this.days.push({label:startDay.format("DD/MM/YYYY")+" - "+endDay.format("DD/MM/YYYY"),value:startDay.format("DD/MM/YYYY")});
    for (var i = 0; i <= 4; i++) {
      this.days.push( 
        {label:startDay.add(7,'d').format("DD/MM/YYYY")+" - "+endDay.add(7,'d').format("DD/MM/YYYY"),value:startDay.format("DD/MM/YYYY")});
    }
    this.days.reverse();
  }

  getTimetable() {
     this.pairService.getTimetableByWeek(this.timeform.value.day,this.timeform.value.group).subscribe( data => {
      if(data.length===0){
        this.messageService.add({severity:'info',summary:'',detail:'No data found'});
      } else {
        console.log(data);
      this.pairs=data;
      this.updateRowGroupMetaData();
    }
    });
  }

  onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};
        if (this.pairs) {
            for (let i = 0; i < this.pairs.length; i++) {
                let rowData = this.pairs[i];
                let date = rowData.date;
                if (i == 0) {
                    this.rowGroupMetadata[date] = { index: 0, size: 1 };
                }
                else {
                    let previousRowData = this.pairs[i - 1];
                    let previousRowGroup = previousRowData.date;
                    if (date === previousRowGroup)
                        this.rowGroupMetadata[date].size++;
                    else
                        this.rowGroupMetadata[date] = { index: i, size: 1 };
                }
            }
        }
    }
}
