import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { StoreModule } from '@ngrx/store';
import { adminFilmReducer } from './store/admin.reducer';
import { AdminFilmState } from './store/admin.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminScreeningsComponent } from '../admin-screenings/admin-screenings.component';

export interface AdminState {
  AdminFilm: AdminFilmState;
}

@NgModule({
  declarations: [AdminScreeningsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
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
