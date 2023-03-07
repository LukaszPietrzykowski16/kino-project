import { Component, inject, Input } from '@angular/core';
import { take } from 'rxjs';
import { TicketsService } from 'src/app/domains/cinema-hall/reservation/services/tickets.service';
import { CinemaHallService } from 'src/app/domains/cinema-hall/services/cinema-hall.service';
import { UserTicketService } from 'src/app/domains/user-tickets/services/user-ticket.service';
import { ApiServiceService } from '../../services/api-service.service';
import { Film } from '../film-panel.component';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})
export class FilmComponent {
  private userData = inject(UserTicketService);
  private ticketService = inject(TicketsService);
  private cinemaService = inject(CinemaHallService);
  private apiService = inject(ApiServiceService);

  @Input() film!: Film;
  @Input() hours!: Array<string>;
  @Input() premiere!: boolean;
  @Input() selectedDay!: string;
  @Input() now!: number;

  date$ = this.apiService.date$;

  moreDetails(title: string, hour: string) {
    this.ticketService.cleanState();
    this.date$
      .pipe(take(1))
      .subscribe((value) => (this.selectedDay = value.dateString))
      .unsubscribe();

    this.cinemaService.setStrings(title, hour, this.selectedDay);
  }

  changeToString(test: string) {
    return Number(test[0] + test[1]);
  }

  ratings$ = this.userData.ratings$;

  longDescription = true;

  showMoreDescription() {
    this.longDescription = !this.longDescription;
  }
}
