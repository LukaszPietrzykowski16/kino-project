import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seat } from '../reservation.component';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeatsService {
  private seats$$ = new BehaviorSubject<Seat[]>([]);

  get seats$() {
    return this.seats$$.asObservable();
  }

  createSeats() {
    // this.getSeats().pipe(map(value) => {})
    this.getSeats().subscribe((value) => {
      this.seats$$.next(value);
    });
  }

  addSeat(seatInfo: Seat) {
    this.seats$$.next([...this.seats$$.getValue(), ...[seatInfo]]);
  }

  removeSeat() {}
  // it should be in seperatre file?
  private url: string = `http://localhost:3000/reservation`;

  constructor(private http: HttpClient) {}

  getSeats() {
    return this.http.get<Array<Seat>>(this.url);
  }
}
