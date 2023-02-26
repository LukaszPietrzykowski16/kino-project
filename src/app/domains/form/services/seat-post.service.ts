import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { map } from 'rxjs';
import {
  Seat,
  Ticket,
} from '../../cinema-hall/reservation/reservation.component';
import { TicketsService } from '../../cinema-hall/reservation/services/tickets.service';

@Injectable({
  providedIn: 'root',
})
export class SeatPostService {
  private http = inject(HttpClient);
  private ticketService = inject(TicketsService);

  tickets$ = this.ticketService.tickets$;

  sendSeats() {
    // fix
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

  reserveSeat(position: number, exactSeat: string) {
    return this.http
      .patch<Seat>(`http://localhost:3000/reservation/${position}`, {
        seat: exactSeat,
        isChoosen: true,
      })
      .subscribe();
  }
}
