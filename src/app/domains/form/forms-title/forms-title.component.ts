import { Component, inject } from '@angular/core';

import { Ticket } from '../../cinema-hall/reservation/reservation.component';
import { TicketsService } from '../../cinema-hall/reservation/services/tickets.service';
import { CinemaHallService } from '../../cinema-hall/services/cinema-hall.service';
import { PromotionService } from '../promotion.service';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-forms-title',
  templateUrl: './forms-title.component.html',
  styleUrls: ['./forms-title.component.css'],
})
export class FormsTitleComponent {
  private promotionService = inject(PromotionService);
  private cinemaHall = inject(CinemaHallService);
  private ticketService = inject(TicketsService);
  reservation$ = this.cinemaHall.reservation$;
  tickets$ = this.ticketService.tickets$;
  ticketPrice: number = 0;
  title: Array<String | undefined> = [];
  seats: Array<Ticket> = [];
  promotion: any = false;

  price() {
    this.seats.forEach((elem) => {
      this.ticketPrice += Number(elem.type.match(/\d+/g));
    });
  }

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.promotionService.getPromotion().subscribe((test) => {
      this.promotion = test;
    });
    this.seats = this.formService.displaySeats();
    this.price();
  }
}
