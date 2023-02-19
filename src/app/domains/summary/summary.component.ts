import { Component, inject } from '@angular/core';
import { Ticket } from '../cinema-hall/reservation/reservation.component';
import { FormService } from '../form/services/form.service';
import { FormInfoService } from '../form/services/form-info.service';
import { QrService } from './services/qr.service';
import { CinemaHallService } from '../cinema-hall/services/cinema-hall.service';
import { TicketsService } from '../cinema-hall/reservation/services/tickets.service';

export interface qrCode {
  url: string;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  private cinemaHall = inject(CinemaHallService);
  private ticketService = inject(TicketsService);

  reservation$ = this.cinemaHall.reservation$;
  tickets$ = this.ticketService.tickets$;

  url: string | undefined;

  constructor(private qrService: QrService) {}

  ngOnInit() {
    this.qrService.getQr().subscribe((qrCode) => {
      this.url = qrCode.url;
    });
  }
}
