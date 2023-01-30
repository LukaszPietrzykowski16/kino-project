import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component/login-form.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
    ]),
    StoreModule.forFeature('User', userReducer),
  ],
})
export default class AuthModule {}
