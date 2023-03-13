import { Component, inject } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { take } from 'rxjs';
import { CinemaHallService } from '../../domains/cinema-hall/services/cinema-hall.service';
import { AuthService } from 'src/app/auth/authentication/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { UserTicketService } from 'src/app/domains/user-tickets/services/user-ticket.service';
import { TicketsService } from 'src/app/domains/cinema-hall/reservation/services/tickets.service';
import { FilmData } from './film-panel.interface';

@Component({
  selector: 'app-film-panel',
  templateUrl: './film-panel.component.html',
  styleUrls: ['./film-panel.component.scss'],
})
export class FilmPanelComponent {
  private apiService = inject(ApiServiceService);
  private store = inject<Store<AppState>>(Store);
  private userData = inject(UserTicketService);
  private ticketService = inject(TicketsService);
  private cinemaService = inject(CinemaHallService);
  private authService = inject(AuthService);

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

  moreDetails(filmData: FilmData) {
    this.ticketService.cleanState();
    this.date$
      .pipe(take(1))
      .subscribe((value) => (this.selectedDay = value.dateString))
      .unsubscribe();

    this.cinemaService.setStrings(
      filmData.title,
      filmData.hour,
      this.selectedDay
    );
  }

  ngOnInit() {
    this.apiService.getShowing();
  }
}
