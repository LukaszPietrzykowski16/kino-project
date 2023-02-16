import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlikService } from '../services/blik.service';
import { Router } from '@angular/router';

import { FormInfoService } from '../services/form-info.service';
import { FormService } from '../services/form.service';
import { SeatPostService } from '../services/seat-post.service';
import { validatorCompareEmail } from './email-chech.service';
import { PromotionService } from '../promotion.service';

export interface BlikCode {
  code: number;
}

@Component({
  selector: 'app-forms-panel',
  templateUrl: './forms-panel.component.html',
  styleUrls: ['./forms-panel.component.css'],
})
export class FormsPanelComponent {
  blik: boolean = false;
  blikCode: number = NaN;

  private blikServiceCode = inject(BlikService);
  private router = inject(Router);
  private formInfo = inject(FormInfoService);
  private seatPostService = inject(SeatPostService);
  private formService = inject(FormService);
  private promotionService = inject(PromotionService);

  isBonus = false;

  profileForm = new FormGroup(
    {
      lastName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      phoneNumber: new FormControl('', {
        validators: [Validators.required, Validators.minLength(9)],
      }),
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      }),
      emailAgain: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      }),
      checkbox: new FormControl(''),
      bonusCode: new FormControl('', {
        validators: [Validators.minLength(6)],
      }),
    },
    {
      validators: validatorCompareEmail('email', 'emailAgain'),
    }
  );

  blikForm = new FormGroup({
    blikCodeInput: new FormControl(''),
  });

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  showBlik() {
    this.blik = true;
  }

  pay() {
    if (this.blikCode === Number(this.blikForm.value.blikCodeInput)) {
      this.formInfo.setInformation(
        this.profileForm.controls.firstName.value,
        this.profileForm.controls.lastName.value,
        this.profileForm.controls.email.value,
        this.profileForm.controls.phoneNumber.value
      );
      this.seatPostService.sendSeats(this.formService.displaySeats());
      this.router.navigate(['/podsumowanie']);
    }
  }

  promotionCode() {
    if (this.bonusCode.value === '123456') {
      this.promotionService.getPromotion().next(true);
    }
  }

  ngOnInit() {
    this.blikServiceCode.getBlik().subscribe((num) => {
      this.blikCode = num.code;
    });
  }

  get lastCtrl() {
    return this.profileForm.controls.lastName;
  }

  get bonusCode() {
    return this.profileForm.controls.bonusCode;
  }

  get firstCtrl() {
    return this.profileForm.controls.firstName;
  }

  get emailAgain() {
    return this.profileForm.controls.emailAgain;
  }

  get email() {
    return this.profileForm.controls.email;
  }
}
