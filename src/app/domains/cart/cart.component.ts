import { Component } from '@angular/core';
import { CartTicketComponent } from './cart-ticket/cart-ticket.components';

@Component({
  standalone: true,
  selector: 'cart-component',
  imports: [CartTicketComponent],
  template: ` <cart-ticket> </cart-ticket> `,
})
export class CartComponent {
  // component logic
}
