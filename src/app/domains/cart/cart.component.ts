import { Component, inject } from '@angular/core';
import { CartTicketComponent } from './cart-ticket/cart-ticket.components';
import { CartService } from './service/cart.service';

@Component({
  standalone: true,
  selector: 'cart-component',
  imports: [CartTicketComponent],
  template: ` <cart-ticket> </cart-ticket> `,
})
export class CartComponent {
  cartService = inject(CartService);
  // component logic

  ngOnInit() {
    this.cartService.cart$.subscribe((test) => {
      console.log(test);
    });
  }
}
