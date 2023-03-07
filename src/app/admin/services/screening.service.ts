import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Screening } from 'src/app/home/film-panel/film-panel.component';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  private http = inject(HttpClient);

  getScreening() {
    return this.http.get<Screening[]>(`http://localhost:3000/screening`);
  }

  postScreening(data: Screening) {
    return this.http.post(`http://localhost:3000/screening`, {
      id: NaN,
      filmId: data.filmId,
      premiere: data.premiere,
      date: data.date,
      hours: data.hours,
    });
  }
}
