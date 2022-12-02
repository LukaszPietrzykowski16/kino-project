import { Film } from './film-panel/film-panel.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class ApiServiceService {
  date:string = '01-12'
  url:string = `http://localhost:3000/films?date=${this.date}`
  
  constructor(private http: HttpClient) { }

  getFilms(){
    return this.http.get<Array<Film>>(this.url);
  }

}
