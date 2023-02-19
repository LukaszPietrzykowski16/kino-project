import { Repertoire } from '../film-panel/film-panel.component';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ChangeDayService } from '../data-panel/services/change-day.service';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private http = inject(HttpClient);
  private changeDayService = inject(ChangeDayService);

  private date$$ = new BehaviorSubject<{ dateString: string }>({
    dateString: this.changeDayService.formatDate(new Date()),
  });

  private screenings$$ = new BehaviorSubject<Repertoire[]>([]);

  get date$() {
    return this.date$$.asObservable();
  }

  get dateValue() {
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
}
