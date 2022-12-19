import { Component } from '@angular/core';
import { FormService } from '../form.service';
import { Ticket } from '../reservation/reservation.component';

@Component({
  selector: 'app-forms-title',
  templateUrl: './forms-title.component.html',
  styleUrls: ['./forms-title.component.css']
})
export class FormsTitleComponent {


   
  title: Array<String | undefined> = []
  seats: Array<Ticket> = []


  constructor(private formService: FormService) {}

  ngOnInit() {
    this.title = this.formService.displayTitle()
    this.seats = this.formService.displaySeats()
  }
}
