import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Screening } from 'src/app/home/film-panel/film-panel.component';

@Injectable({
  providedIn: 'root',
})
export class ExactScreeningService {
  http = inject(HttpClient);

  getScreening(date: string) {
    console.log(date);
    return this.http.get<Screening[]>(
      `http://localhost:3000/screening?date=${date}`
    );
  }

  constructor() {}
}
