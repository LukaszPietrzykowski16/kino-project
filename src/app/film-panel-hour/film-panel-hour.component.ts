import { Component } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-film-panel-hour',
  templateUrl: './film-panel-hour.component.html',
  styleUrls: ['./film-panel-hour.component.css']
})
export class FilmPanelHourComponent {
    currentDate:any = moment().format('HH:MM');
    
    hours = ['09:00', '10:30', '13:30', '15:30', '17:00', '21:00', '22:00', '23:00', '23:00']

    ngOnInit(){
   
    }
}
