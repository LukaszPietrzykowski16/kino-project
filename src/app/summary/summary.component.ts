import { Component } from '@angular/core';
import { FormService } from '../form.service';
import { Ticket } from '../reservation/reservation.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  title: Array<String | undefined> = []
  seats: Array<Ticket> = []


  constructor(private formService: FormService) {}

  ngOnInit() {
    this.title = this.formService.displayTitle()
    this.seats = this.formService.displaySeats()
  }
}