import { Component, inject } from '@angular/core';
import { CinemaHallService } from '../cinema-hall/services/cinema-hall.service';
import { TicketsService } from '../cinema-hall/reservation/services/tickets.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { SendTicketsService } from '../user-tickets/services/send-tickets.service';
import { RouterModule } from '@angular/router';
import { FilmService } from '../want-watch/film/film.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  imports: [NgIf, AsyncPipe, NgFor, RouterModule],
})
export default class SummaryComponent {
  private cinemaHall = inject(CinemaHallService);
  private ticketService = inject(TicketsService);
  private filmService = inject(FilmService);
  private sendTicketService = inject(SendTicketsService);

  reservation$ = this.cinemaHall.reservation$;
  reservationInfo$ = this.sendTicketService.reservationInfo$;
  tickets$ = this.ticketService.tickets$;

  urlValue$ = this.sendTicketService.getUrlInfo$;

  ngOnInit() {
    this.filmService.resetArray();
  }

  sendArray() {
    this.sendTicketService.sendReservationData();
  }

  ngOnDestroy() {
    this.sendTicketService.sendReservationData();
  }
}
