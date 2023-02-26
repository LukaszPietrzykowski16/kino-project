import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Seat } from '../../cinema-hall/reservation/reservation.component';
import { SeatsService } from '../../cinema-hall/reservation/services/seats.service';
import { TicketsService } from '../../cinema-hall/reservation/services/tickets.service';

@Injectable({
  providedIn: 'root',
})
export class SeatPostService {
  private http = inject(HttpClient);
  private ticketService = inject(TicketsService);
  private seatsService = inject(SeatsService);

  tickets$ = this.ticketService.tickets$;

  sendSeats() {
    this.tickets$.subscribe((ticket) => {
      ticket.map((exactTicket) => {
        this.postSeat(exactTicket.seat, exactTicket.position);
      });
    });
  }

  postSeat(exactSeat: string, position: number) {
    return this.http
      .patch<Seat>(`http://localhost:3000/reservation/${position}`, {
        seat: exactSeat,
        avaliable: false,
      })
      .subscribe();
  }

  reserveSeat(position: number, exactSeat: string, isChoosen: boolean) {
    return this.http
      .patch<Seat>(`http://localhost:3000/reservation/${position}`, {
        seat: exactSeat,
        avaliable: false,
        isChoosen: isChoosen,
      })
      .subscribe((test) => {
        this.seatsService.updateColor(test);
      });
  }
}
