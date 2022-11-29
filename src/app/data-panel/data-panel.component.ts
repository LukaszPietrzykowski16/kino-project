import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.css']
})
export class DataPanelComponent {
  // moment.js to handle a date 
 
  
  formatDate(date: { getMonth: () => number; getDate: () => any; getFullYear: () => any; }) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1)
    ].join('/');
  }

  padTo2Digits(num: { toString: () => string; }) {
    return num.toString().padStart(2, '0');
  }

  today = this.formatDate(new Date());
  nextDays = new Date();
  arr:Array<string> = []
 

  constructor() {}

  changeDay(day:any){
    this.today = day
  }

  ngOnInit(): void {
   for(let i=0; i<7; i++){
      let nextDay:Date = new Date(this.nextDays);
      nextDay.setDate((this.nextDays.getDate()+i))
      let exactDay = this.formatDate(nextDay)
      this.arr.push(exactDay)
    }
  }

}
