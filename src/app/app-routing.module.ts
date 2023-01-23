import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FilmPanelComponent } from './home/film-panel/film-panel.component';
import { AdminComponent } from './auth/admin/admin/admin.component';
import { MainComponent } from './home/main/main.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FormsPanelComponent } from './domains/form/forms-panel/forms-panel.component';
import { FormsMainComponent } from './domains/form/forms-main/forms-main.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'rezerwacja', component: ReservationComponent },
  { path: 'formularz', component: FormsMainComponent },
  { path: 'podsumowanie', component: SummaryComponent },
  { path: 'rezerwacja/:item/:hour/:title', component: ReservationComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
