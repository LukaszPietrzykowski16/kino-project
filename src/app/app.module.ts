import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MainComponent } from './home/main/main.component';
import { DataPanelComponent } from './home/data-panel/data-panel.component';
import { FilmPanelComponent } from './home/film-panel/film-panel.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IconsModule } from './icons/icons.module';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './auth/admin/admin/admin.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { ReservationComponent } from './domains/cinema-hall/reservation/reservation.component';
import { FormsPanelComponent } from './domains/form/forms-panel/forms-panel.component';
import { FilmPanelHourComponent } from './home/film-panel-hour/film-panel-hour.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormsMainComponent } from './domains/form/forms-main/forms-main.component';

import { SummaryComponent } from './domains/summary/summary.component';
import { FormsTitleComponent } from './domains/form/forms-title/forms-title.component';
import { TicketsPriceComponent } from './domains/cinema-hall/tickets-price/tickets-price.component';
import AuthModule from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserState } from './auth/store/user.interface';
import { userReducer } from './auth/store/user.reducer';
import { RouterModule } from '@angular/router';

export interface AppState {
  User: UserState;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    DataPanelComponent,
    FilmPanelComponent,
    FooterComponent,
    AdminComponent,
    ErrorPageComponent,
    ReservationComponent,
    FormsPanelComponent,
    FilmPanelHourComponent,
    FormsTitleComponent,
    FormsMainComponent,
    TicketsPriceComponent,
    SummaryComponent,
  ],
  imports: [
    BrowserModule,
    IconsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(userReducer),
    EffectsModule.forRoot([]),

    RouterModule.forRoot([
      {
        path: '',
        children: [
          {
            path: 'logowanie',
            loadChildren: () => import('./auth/auth.module'),
          },
        ],
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
