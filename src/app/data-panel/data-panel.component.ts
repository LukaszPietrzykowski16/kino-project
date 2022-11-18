import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.css']
})
export class DataPanelComponent {
  currentDate:any = moment();
  days:Array<string> = []
  
  
  weekStart = this.currentDate.clone().startOf('isoWeek');
  weekEnd = this.currentDate.clone().endOf('isoWeek');

  constructor() {}


  ngOnInit(): void {
    for (let i = 0; i <= 6; i++) {
      this.days.push(moment(this.weekStart).add(i, 'days').format("D/MM"));
    }
    console.log(this.days)
  }
  
}
