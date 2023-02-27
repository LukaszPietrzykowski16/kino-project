import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { StoreModule } from '@ngrx/store';
import { AdminFilmState, AdminScreeningState } from './store/admin.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EffectsModule } from '@ngrx/effects';
import { addFilmReducer, addScreeningReducer } from './store/admin.reducer';
import { AdminEffects } from './store/admin.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminScreeningsComponent } from './admin-screenings/admin-screenings.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

export interface FilmAdminState {
  AdminFilm: AdminFilmState[];
}

export interface ScreeningAdminState {
  AdminScreening: AdminScreeningState[];
}

@NgModule({
  declarations: [AdminComponent, AdminScreeningsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    EffectsModule.forFeature([AdminEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
      },
    ]),
    StoreModule.forFeature('AdminFilm', [addFilmReducer]),
    StoreModule.forFeature('AdminScreening', [addScreeningReducer]),
  ],
})
export class AdminModule {}
