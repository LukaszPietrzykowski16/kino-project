import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.css']
})
export class DataPanelComponent {
  // moment.js to handle a date 
  currentDate:any = moment();
  // displaying days
  days:Array<string> = []
  
  // current day
  currentDay:string = moment().format("D/MM"); 
  
  weekStart:object = this.currentDate.clone().startOf('isoWeek');
  weekEnd:object = this.currentDate.clone().endOf('isoWeek');

  constructor() {}


  ngOnInit(): void {
    console.log(this.currentDay)
    for (let i = 0; i <= 6; i++) {
      this.days.push(moment(this.weekStart).add(i, 'days').format("D/MM"));
    }
    
  }
  
}
