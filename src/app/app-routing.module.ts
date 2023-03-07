import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './home/main/main.component';
import { ReservationComponent } from './domains/cinema-hall/reservation/reservation.component';
import { NotAdminGuard } from './shared/guards/no-admin.guard';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  // guard
  { path: '', component: MainComponent }, // , canActivate: [NotAdminGuard]canActivate: [NotAdminGuard]
  {
    // canMatch: [AdminGuard]
    path: 'date/:date',
    component: MainComponent,
  },
  {
    path: 'rezerwacja/:item/:hour/:title',
    component: ReservationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
