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
  constructor() {}
}
