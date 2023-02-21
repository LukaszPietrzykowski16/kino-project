import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { StoreModule } from '@ngrx/store';
import { adminFilmReducer } from './store/admin.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
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
