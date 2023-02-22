import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { StoreModule } from '@ngrx/store';

import { AdminFilmState } from './store/admin.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './store/admin.effects';
import { addFilmReducer } from './store/admin.reducer';

export interface AdminState {
  AdminFilm: AdminFilmState[];
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    EffectsModule.forFeature([AdminEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
      },
    ]),
    StoreModule.forFeature('AdminFilm', addFilmReducer),
  ],
})
export class AdminModule {}
