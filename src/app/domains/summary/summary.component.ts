import { Component, inject } from '@angular/core';
import { Ticket } from '../cinema-hall/reservation/reservation.component';
import { FormService } from '../form/services/form.service';
import { FormInfoService } from '../form/services/form-info.service';
import { QrService } from './services/qr.service';
import { CinemaHallService } from '../cinema-hall/services/cinema-hall.service';
import { TicketsService } from '../cinema-hall/reservation/services/tickets.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { SendTicketsService } from '../user-tickets/services/send-tickets.service';
import { RouterModule } from '@angular/router';
import { FilmService } from '../want-watch/film/film.service';

export interface qrCode {
  url: string;
}

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
  private qrService = inject(QrService);

  reservation$ = this.cinemaHall.reservation$;
  reservationInfo$ = this.sendTicketService.reservationInfo$;
  tickets$ = this.ticketService.tickets$;
  url: string | undefined;

  urlValue$ = this.sendTicketService.getUrlInfo$;

  ngOnInit() {
    this.filmService.resetArray();
    this.qrService.getQr().subscribe((qrCode) => {
      this.url = qrCode.url;
    });
  }

  sendArray() {
    this.sendTicketService.sendReservationData();
  }

  ngOnDestroy() {
    this.sendTicketService.sendReservationData();
  }
}
