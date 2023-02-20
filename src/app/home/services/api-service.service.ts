import { Repertoire } from '../film-panel/film-panel.component';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { ChangeDayService } from '../data-panel/services/change-day.service';
import { CinemaHallService } from 'src/app/domains/cinema-hall/services/cinema-hall.service';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private http = inject(HttpClient);
  private changeDayService = inject(ChangeDayService);
  private cinemaHallService = inject(CinemaHallService);

  private date$$ = new BehaviorSubject<{ dateString: string }>({
    dateString: this.changeDayService.formatDate(new Date()),
  });

  private screenings$$ = new BehaviorSubject<Repertoire[]>([]);

  get date$() {
    return this.date$$.asObservable();
  }

  get dateValue$() {
    return this.date$$.value;
  }

  get screenings$() {
    return this.screenings$$.asObservable();
  }

  updateDate(newDate: string) {
    this.date$$.next({ dateString: newDate });
    this.getShowing();
  }

  getShowing() {
    return this.http
      .get<Array<Repertoire>>(
        `http://localhost:3000/screening?date=${this.date$$.value.dateString}&_expand=film`
      )
      .subscribe((value) => {
        this.screenings$$.next(value);
      });
  }

  getExactShow(date: string, hour: string, title: string) {
    return this.http
      .get<Array<Repertoire>>(
        `http://localhost:3000/screening?date=${date}&?hours=${hour}&_expand=film`
      )
      .pipe(
        tap((value) => {
          // here should be validators if this film exist etc...
          this.cinemaHallService.setStrings(
            value[0].film.title,
            hour,
            value[0].date
          );
        })
      )
      .subscribe();
  }
}
