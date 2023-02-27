import { Component, Input } from '@angular/core';
import { SingleTicket } from '../user-ticket.interface';

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.css'],
})
export class UserTicketComponent {
  @Input() ticket!: SingleTicket;
}
