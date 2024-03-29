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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NumbersOnlyDirective } from '../shared/directives/numbers-only.directive';
import { NoSpacesDirective } from '../shared/directives/no-space.directive';
import { AdminGuard } from '../shared/guards/admin.guard';
import { NotAdminGuard } from '../shared/guards/no-admin.guard';
import { AdminWelcomePanelComponent } from './admin-welcome-panel/admin-welcome-panel.component';

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
    NumbersOnlyDirective,
    NoSpacesDirective,
    MatDatepickerModule,
    EffectsModule.forFeature([AdminEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: AdminWelcomePanelComponent,
      },
      {
        path: 'add-film',
        component: AdminComponent,
      },
      {
        path: 'add-screening',
        component: AdminScreeningsComponent,
      },
    ]),
    StoreModule.forFeature('AdminFilm', [addFilmReducer]),
    StoreModule.forFeature('AdminScreening', [addScreeningReducer]),
  ],
})
export class AdminModule {}
