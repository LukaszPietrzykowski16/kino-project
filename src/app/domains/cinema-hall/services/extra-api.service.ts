import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../../../home/film-panel/film-panel.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExtraApiService {
  hour: string = '';
  title: string = '';
  date: string = '';
  newUrl = '';

  private url = `http://localhost:3000/films?title=${this.title}`;
  private secondUrl = `http://localhost:3000/screening?date=${this.date}&?hours=${this.hour}`;

  displayInfoFromUrl() {
    this.newUrl = this.router.url;
    const replacing = this.newUrl
      .replace('/rezerwacja/', '')
      .replace(/\//g, ' ')
      .replace('%2F', '-');
    const data = replacing.split(' ');
    this.date = data[0];
    this.hour = data[1];
    this.title = data[2];
    this.url = `http://localhost:3000/films?title=${this.title}`;
    return this.getFilms();
  }

  getExactDate() {
    this.newUrl = this.router.url;
    const replacing = this.newUrl
      .replace('/rezerwacja/', '')
      .replace(/\//g, ' ')
      .replace('%2F', '-');
    const data = replacing.split(' ');
    return data[1];
  }

  getFilms() {
    return this.http.get<Array<any>>(this.url);
  }

  getScreening() {
    return this.http.get<Array<any>>(this.secondUrl);
  }

  constructor(private router: Router, private http: HttpClient) {}
}
