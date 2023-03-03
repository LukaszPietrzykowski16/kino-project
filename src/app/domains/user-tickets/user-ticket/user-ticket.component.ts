import { Component, Input } from '@angular/core';
import { SingleTicket } from '../user-ticket.interface';

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.scss'],
})
export class UserTicketComponent {
  barcodeApiUrl = 'https://barcodeapi.org/api/127/';
  orderId = '1';

  @Input() ticket!: SingleTicket;
}
