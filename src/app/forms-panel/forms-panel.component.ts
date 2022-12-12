import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { Ticket } from '../reservation/reservation.component';


@Component({
  selector: 'app-forms-panel',
  templateUrl: './forms-panel.component.html',
  styleUrls: ['./forms-panel.component.css']
})
export class FormsPanelComponent {
  // if there is no props from it renders something like 'go back buy a ticket first' idk
 
  title: Array<String> = []
  seats: Array<Ticket> = []

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.title = this.formService.displayTitle()
    this.seats = this.formService.displaySeats()
    console.log(this.seats)
  }
}
