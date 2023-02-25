import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './home/main/main.component';
import { ReservationComponent } from './domains/cinema-hall/reservation/reservation.component';
import { NotAdminGuard } from './no-admin.guard';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'date/:date',
    component: MainComponent,
    canActivate: [NotAdminGuard],
  },
  {
    path: 'rezerwacja/:item/:hour/:title',
    component: ReservationComponent,
    canActivate: [NotAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
