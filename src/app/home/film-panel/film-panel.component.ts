import { Component, inject, Input } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { map, take } from 'rxjs';
import { Film } from 'angular-feather/icons';
import { CinemaHallService } from '../../domains/cinema-hall/services/cinema-hall.service';
import { AuthService } from 'src/app/auth/authentication/auth.service';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { UserTicketService } from 'src/app/domains/user-tickets/services/user-ticket.service';
import { TicketsService } from 'src/app/domains/cinema-hall/reservation/services/tickets.service';

export interface Screening {
  filmId: number;
  premiere: boolean;
  date: string;
  hours: Array<string>;
}

export interface Film {
  id: number;
  title: string;
  types: string;
  image: string;
  description: string;
  rating: number;
  length: number;
}

export interface Repertoire {
  filmId: number;
  premiere: boolean;
  rating: number;
  date: string;
  hours: Array<string>;
  film: Film;
}

@Component({
  selector: 'app-film-panel',
  templateUrl: './film-panel.component.html',
  styleUrls: ['./film-panel.component.css'],
})
export class FilmPanelComponent {
  private apiService = inject(ApiServiceService);
  private store = inject<Store<AppState>>(Store);
  private userData = inject(UserTicketService);
  private ticketService = inject(TicketsService);
  private cinemaService = inject(CinemaHallService);
  private authService = inject(AuthService);

  isLogin = false;
  userId: number = NaN;
  moviesArray: Array<Number> = [];
  durationInSeconds = 3;
  wantWatch = true;

  private date = new Date();
  now = this.date.getHours();
  selectedDay: string = '';

  screenings$ = this.apiService.screenings$;
  date$ = this.apiService.date$;
  ratings$ = this.userData.ratings$;
  auth$ = this.authService.isAuth$;
  user$ = this.store.select('User');

  changeToString(test: string) {
    return Number(test[0] + test[1]);
  }

  moreDetails(title: string, hour: string) {
    this.ticketService.cleanState();
    this.date$
      .pipe(take(1))
      .subscribe((value) => (this.selectedDay = value.dateString))
      .unsubscribe();

    this.cinemaService.setStrings(title, hour, this.selectedDay);
  }

  ngOnInit() {
    this.apiService.getShowing();
  }
}
