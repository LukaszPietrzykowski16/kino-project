import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HallService {
  private http = inject(HttpClient);

  getReservation() {
    return this.http.get('http://localhost:3000/reservation-hall');
  }
}
