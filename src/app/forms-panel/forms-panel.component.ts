import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { Ticket } from '../reservation/reservation.component';


@Component({
  selector: 'app-forms-panel',
  templateUrl: './forms-panel.component.html',
  styleUrls: ['./forms-panel.component.css']
})
export class FormsPanelComponent {
  // if there is no props from it renders something like 'go back buy a ticket first' idk
 
  title: Array<String | undefined> = []
  seats: Array<Ticket> = []


  constructor(private formService: FormService) {}

  profileForm = new FormGroup({
    lastName: new FormControl('',  {
      validators: [
        Validators.required,
        Validators.minLength(3),
      ],
    }),
    firstName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
      ],
    }),
    phoneNumber: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(9),
      ]
    }),
    email: new FormControl(''),
    emailAgain: new FormControl(''),
    checkbox: new FormControl(''),
    bonusCode: new FormControl(''),
  })
  
  get lastCtrl() {
    return this.profileForm.controls.lastName;
  }

  get firstCtrl() {
    return this.profileForm.controls.firstName;
  }

  ngOnInit() {
    this.title = this.formService.displayTitle()
    this.seats = this.formService.displaySeats()
  }
}
