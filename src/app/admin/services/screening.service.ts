import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Screening } from 'src/app/home/film-panel/film-panel.component';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  http = inject(HttpClient);

  getScreening() {
    return this.http.get<Screening[]>(`http://localhost:3000/screening`);
  }

  postScreening(data: Screening) {
    console.log(data);
    return this.http.post(`http://localhost:3000/screening`, {
      id: NaN,
      filmId: data.filmId,
      premiere: data.premiere,
      date: data.date,
      hours: [
        '09:00',
        '10:30',
        '13:30',
        '15:30',
        '17:00',
        '21:00',
        '22:00',
        '23:00',
      ],
    });
  }
  constructor() {}
}
