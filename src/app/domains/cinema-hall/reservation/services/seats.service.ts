import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seat } from '../reservation.component';

@Injectable({
  providedIn: 'root',
})
export class SeatsService {
  private url: string = `http://localhost:3000/reservation`;

  constructor(private http: HttpClient) {}

  getSeats() {
    return this.http.get<Array<Seat>>(this.url);
  }
}
