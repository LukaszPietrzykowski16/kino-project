import { Repertoire } from '../film-panel/film-panel.component';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private http = inject(HttpClient);
  private date = '';

  private date$$ = new BehaviorSubject<{ dateString: string }>({
    dateString: '17-02',
  });

  private screenings$$ = new BehaviorSubject<Repertoire[]>(
    []
    // [
    //   {
    //     filmId: NaN,
    //     premiere: false,
    //     date: '',
    //     hours: [],
    //   },
    // ]
    //   {
    //   title: '',
    //   types: '',
    //   image: '',
    //   description: '',
    // }
  );

  get date$() {
    return this.date$$.asObservable();
  }

  get screenings$() {
    return this.screenings$$.asObservable();
  }

  updateDate(newDate: string) {
    console.log(newDate);
  }

  getShowing() {
    this.date$.subscribe((test) => {
      this.date = test.dateString;
    });
    return this.http
      .get<Array<Repertoire>>(
        `http://localhost:3000/screening?date=${this.date}&_expand=film`
      )
      .subscribe((value) => {
        this.screenings$$.next(value);
      });
  }
}
