import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { AuthService } from '../authentication/auth.service';
import { UserState } from '../store/user.interface';
import { emailValidatorRegex } from './emailValidatorPattern';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private store = inject<Store<AppState>>(Store);

  loginForm = this.createControlGroup();

  createControlGroup() {
    return this.fb.group({
      email: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern(emailValidatorRegex),
        ],
      }),
      password: this.fb.control('', {
        validators: [Validators.required],
      }),
    });
  }

  user$ = this.store.select((state) => state);

  get passwordCtrl() {
    return this.loginForm.controls.password;
  }
  get emailCtrl() {
    return this.loginForm.controls.email;
  }

  checkValidationAndAuth() {
    this.authService.logIn(this.emailCtrl.value, this.passwordCtrl.value);

    this.user$.subscribe((test) => {
      console.log(test.User.type);
    });
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
  }

  ngOnInit() {
    console.log(this.store.select('User'));
  }
}
