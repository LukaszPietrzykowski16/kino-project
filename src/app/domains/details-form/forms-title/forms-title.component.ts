import { Component } from '@angular/core';
import { FormService } from '../form.service';
import { Ticket } from '../domains/cinema-hall/reservation/reservation.component';

@Component({
  selector: 'app-forms-title',
  templateUrl: './forms-title.component.html',
  styleUrls: ['./forms-title.component.css'],
})
export class FormsTitleComponent {
  ticketPrice: number = 0;

  title: Array<String | undefined> = [];
  seats: Array<Ticket> = [];

  price() {
    this.seats.forEach((elem) => {
      this.ticketPrice += Number(elem.type.match(/\d+/g));
    });
  }

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.title = this.formService.displayTitle();
    this.seats = this.formService.displaySeats();
    this.price();
  }
}
