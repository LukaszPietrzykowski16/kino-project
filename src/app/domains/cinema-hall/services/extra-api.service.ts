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

  url = `http://localhost:3000/films?date=${this.date}?title=${this.title}`;

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
    this.url = `http://localhost:3000/films?title=${this.title}&date=${this.date}&date=${this.hour}`;
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
  //http://localhost:3000/films?title=Joker&date=18/12
  //http://localhost:3000/films?title=Joker&date=15-12

  getFilms() {
    return this.http.get<Array<Film>>(this.url);
  }

  constructor(private router: Router, private http: HttpClient) {}
}
