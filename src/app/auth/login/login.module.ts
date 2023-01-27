import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';

import { LoginComponent } from './login.component';
import { userReducer } from '../store/user.reducer';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('User', userReducer),
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export default class LoginModule {}
