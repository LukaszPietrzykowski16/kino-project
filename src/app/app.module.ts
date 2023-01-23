import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { DataPanelComponent } from './home/data-panel/data-panel.component';
import { FilmPanelComponent } from './home/film-panel/film-panel.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IconsModule } from './icons/icons.module';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FormsPanelComponent } from './forms-panel/forms-panel.component';
import { LoginComponent } from './login/login.component';
import { FilmPanelHourComponent } from './home/film-panel-hour/film-panel-hour.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsTitleComponent } from './forms-title/forms-title.component';
import { FormsMainComponent } from './forms-main/forms-main.component';
import { TicketsPriceComponent } from './tickets-price/tickets-price.component';
import { SummaryComponent } from './summary/summary.component';

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
    LoginComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
