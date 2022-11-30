import { Component } from '@angular/core';


@Component({
  selector: 'app-film-panel-hour',
  templateUrl: './film-panel-hour.component.html',
  styleUrls: ['./film-panel-hour.component.css']
})
export class FilmPanelHourComponent {
   arr:Array<string> = []

    currentHour = this.formatDate(new Date());
    
    formatDate(date: { getHours: () => number; getMinutes: () => any;}) {
      return [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes() + 1)
      ].join(':');
    }
  
    padTo2Digits(num: { toString: () => string; }) {
      return num.toString().padStart(2, '0');
    }
  


    hours = ['09:00', '10:30', '13:30', '15:30', '17:00', '21:00', '22:00', '23:00', '23:00']

    ngOnInit(){
      
      for(let i=0; i<this.hours.length; i++){
        
        if(this.currentHour < this.hours[i]){
          this.arr.push(this.hours[i])
        } 
      }
      console.log(this.arr)
     
    }
}
