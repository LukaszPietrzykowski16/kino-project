import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlikService } from '../services/blik.service';
import { Router } from '@angular/router';

import { FormInfoService } from '../services/form-info.service';
import { FormService } from '../services/form.service';
import { SeatPostService } from '../services/seat-post.service';
import { validatorCompareEmail } from './email-chech.service';
import { PromotionService } from '../promotion.service';
import { AuthService } from 'src/app/auth/authentication/auth.service';
import { map, take } from 'rxjs';
import { isPlatformWorkerApp } from '@angular/common';
import { SendTicketsService } from '../../user-tickets/services/send-tickets.service';
import { trimValidator } from '../input-vaidator.validator';
import { AppState } from 'src/app/app.module';
import { Store } from '@ngrx/store';

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
  isLogged = false;

  private blikServiceCode = inject(BlikService);
  private router = inject(Router);
  private formInfo = inject(FormInfoService);
  private seatPostService = inject(SeatPostService);
  private promotionService = inject(PromotionService);
  private authService = inject(AuthService);
  private sendTickets = inject(SendTicketsService);
  private store = inject<Store<AppState>>(Store);

  isBonus = false;
  login$ = this.authService.isAuth$.pipe(map((isAuth) => isAuth.hasAuth));

  profileForm = new FormGroup(
    {
      lastName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(50),
          trimValidator,
        ],
      }),
      firstName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(50),
          trimValidator,
        ],
      }),
      phoneNumber: new FormControl('', {
        validators: [Validators.minLength(9)],
      }),
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          trimValidator,
        ],
      }),
      emailAgain: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          trimValidator,
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

  checkout = true;
  errors: any;

  showBlik() {
    if (this.profileForm.valid) {
      this.checkout = true;
      this.blik = true;
    } else {
      this.checkout = false;
    }
  }

  pay() {
    if (this.blikCode === Number(this.blikForm.value.blikCodeInput)) {
      this.formInfo.setInformation(
        this.profileForm.controls.firstName.value,
        this.profileForm.controls.lastName.value,
        this.profileForm.controls.email.value,
        this.profileForm.controls.phoneNumber.value
      );

      this.sendTickets.sendTickets();

      this.seatPostService.sendSeats();
      this.router.navigate(['/summary']);
    }
  }

  promotionCode() {
    if (this.bonusCode.value === '123456') {
      this.promotionService.getPromotion().next(true);
    }
  }

  ngOnInit() {
    this.store
      .select('User')
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.profileForm.controls.lastName.setValue(result.lastName);
          this.profileForm.controls.firstName.setValue(result.firstName);
          this.profileForm.controls.email.setValue(result.email);
          this.profileForm.controls.emailAgain.setValue(result.email);
        }
      });
    this.login$.subscribe((login) => {
      this.isLogged = login;
    });
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
