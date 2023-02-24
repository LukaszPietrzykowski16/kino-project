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
  private sendTicketService = inject(SendTicketsService);

  reservation$ = this.cinemaHall.reservation$;
  tickets$ = this.ticketService.tickets$;

  url: string | undefined;

  constructor(private qrService: QrService) {}

  urlValue$ = this.sendTicketService.getUrlInfo$;

  ngOnInit() {
    this.qrService.getQr().subscribe((qrCode) => {
      this.url = qrCode.url;
    });
    this.urlValue$.subscribe((test) => {
      console.log(test);
    });
  }
}
