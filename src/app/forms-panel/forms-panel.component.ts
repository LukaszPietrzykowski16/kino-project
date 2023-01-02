import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { Ticket } from '../reservation/reservation.component';
import { BlikService } from '../blik.service';
import { Router } from '@angular/router';

export interface BlikCode{
  code: number
}

@Component({
  selector: 'app-forms-panel',
  templateUrl: './forms-panel.component.html',
  styleUrls: ['./forms-panel.component.css']
})
export class FormsPanelComponent {
  // if there is no props from it renders something like 'go back buy a ticket first' idk

  blik: boolean = false
  blikCode: number = NaN
 
  blikServiceCode = inject(BlikService)
  private router = inject(Router)

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
    email: new FormControl('', {
      validators: [
        Validators.required,
  	    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]
    }),
    emailAgain: new FormControl('', {
      validators: [
        Validators.required,
  	    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]
    }),
    checkbox: new FormControl(''),
    bonusCode: new FormControl('', {
      validators: [
        Validators.minLength(6),
      ]
    }),
  })
  
  blikForm = new FormGroup({
    blikCodeInput: new FormControl('')
  })

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    // console.log(inputChar)
  }

  showBlik(){
    this.blik = true
  }

  pay(){
    if(this.blikCode === Number(this.blikForm.value.blikCodeInput)){
      this.router.navigate(['/podsumowanie']);
    }
  }

  ngOnInit(){
    this.blikServiceCode.getBlik().subscribe((num) => {
      this.blikCode = num.code 
    })
  
  }
  
  get lastCtrl() {
    return this.profileForm.controls.lastName;
  }

  get firstCtrl() {
    return this.profileForm.controls.firstName;
  }

  get emailAgain(){
    return this.profileForm.controls.emailAgain;
  }

  get email(){
    return this.profileForm.controls.email;
  }

 
}
