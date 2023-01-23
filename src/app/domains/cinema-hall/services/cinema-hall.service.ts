import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CinemaHallService {
  title:string = ''
  day:string = ''
  hour:string = ''

  constructor() { }

  displayInfo(){
    return [this.title, this.day, this.hour]
  }

  setStrings(title:string, hour:string, day:string){
    this.title = title;
    this.hour = hour;
    this.day = day
  }
}
