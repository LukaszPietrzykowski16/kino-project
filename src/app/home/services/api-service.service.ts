import { Film } from '../film-panel/film-panel.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  date: string = '05/12';
  url: string = `http://localhost:3000/screening?date=${this.date}`;

  constructor(private http: HttpClient) {}

  changeDate(newDate: string) {
    this.date = newDate;

    this.url = `http://localhost:3000/screening?date=${newDate.replace(
      /\//g,
      '-'
    )}`;

    return this.http.get<Array<Film>>(this.url);
  }

  getFilms() {
    return this.http.get<Array<Film>>(this.url);
  }
}
