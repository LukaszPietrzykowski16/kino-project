import { Film } from './film-panel/film-panel.component';
import { Injectable, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class ApiServiceService {
  date:string = '01-12'
  url:string = `http://localhost:3000/films?date=${this.date}`
  

 


  constructor(private http: HttpClient) { }

  changeDate(newDate:string){
    this.date = newDate
    this.url = `http://localhost:3000/films?date=${newDate}`
    console.log(this.url)
    return this.http.get<Array<Film>>(this.url);
    
  }

  getFilms(){
    return this.http.get<Array<Film>>(this.url);
  }



}
