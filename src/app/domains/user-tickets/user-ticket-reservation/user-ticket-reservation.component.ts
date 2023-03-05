import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TicketReservation } from '../services/user-ticket.service';

@Component({
  selector: 'app-user-ticket-reservation',
  templateUrl: './user-ticket-reservation.component.html',
  standalone: true,
  styleUrls: ['./user-ticket-reservation.component.scss'],
  imports: [NgFor, RouterLink],
})
export class UserTicketReservationComponent {
  @Input() ticket!: TicketReservation;
}
