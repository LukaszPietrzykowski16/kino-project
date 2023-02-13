import { Film, Screening } from '../film-panel/film-panel.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  date: string = '';
  url: string = `http://localhost:3000/screening?date=${this.date}`;
  arrayTest: Array<any> = [];

  constructor(private http: HttpClient) {}

  changeDate(newDate: string) {
    this.date = newDate;

    this.url = `http://localhost:3000/screening?date=${newDate.replace(
      /\//g,
      '-'
    )}`;

    return this.http.get<Array<any>>(this.url);
  }

  getFilms(id: number) {
    return this.http.get<Array<any>>(`http://localhost:3000/films/${id}`);
  }
}
