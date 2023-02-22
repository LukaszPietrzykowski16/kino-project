import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { StoreModule } from '@ngrx/store';
import { adminFilmReducer } from './store/admin.reducer';
import { AdminFilmState } from './store/admin.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './store/admin.effects';

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
    StoreModule.forFeature('AdminFilm', adminFilmReducer),
  ],
})
export class AdminModule {}
