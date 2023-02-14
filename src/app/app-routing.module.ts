import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FilmPanelComponent } from './home/film-panel/film-panel.component';
import { MainComponent } from './home/main/main.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { ReservationComponent } from './domains/cinema-hall/reservation/reservation.component';
import { FormsPanelComponent } from './domains/form/forms-panel/forms-panel.component';
import { FormsMainComponent } from './domains/form/forms-main/forms-main.component';
import { SummaryComponent } from './domains/summary/summary.component';
import { LoginComponent } from './auth/login.component/login-form.component';
import { WantWatchComponent } from './domains/want-watch/want-watch.component';
import { CartComponent } from './domains/cart/cart.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'rezerwacja', component: ReservationComponent },
  { path: 'formularz', component: FormsMainComponent },
  { path: 'podsumowanie', component: SummaryComponent },
  { path: 'chce-obejrzec', component: WantWatchComponent },
  { path: 'rezerwacja/:item/:hour/:title', component: ReservationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
