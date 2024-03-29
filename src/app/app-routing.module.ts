import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './home/main/main.component';
import { ReservationComponent } from './domains/cinema-hall/reservation/reservation.component';

const routes: Routes = [
  // guard
  { path: '', component: MainComponent },
  {
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
