import { Component, inject } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Subject, takeUntil, tap } from 'rxjs';

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
  private unsubscribe$ = new Subject();

  reservation$ = this.cinemaHall.reservation$;
  tickets$ = this.ticketService.tickets$;

  ticketPrice: number = 0;
  newPrice: number = 0;
  promotion: unknown = false;

  price() {
    this.tickets$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((ticket) => {
          ticket.map((elem) => {
            this.ticketPrice += Number(elem.type.match(/\d+/g));
          });
        })
      )
      .subscribe(); // ???
    // .unsubscribe();
  }

  ngOnInit() {
    this.promotionService.getPromotion().subscribe((test) => {
      this.promotion = test;
      this.newPrice = Math.floor(this.ticketPrice / 1.2);
    });

    this.price();
  }

  ngOnDestroy() {
    this.unsubscribe$.next({});
    this.unsubscribe$.complete();
  }
}
