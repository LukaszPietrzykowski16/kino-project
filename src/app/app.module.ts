import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { DataPanelComponent } from './data-panel/data-panel.component';
import { FilmPanelComponent } from './film-panel/film-panel.component';
import { FooterComponent } from './footer/footer.component';
import { IconsModule } from './icons/icons.module';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FormsPanelComponent } from './forms-panel/forms-panel.component';
import { LoginComponent } from './login/login.component';
import { FilmPanelHourComponent } from './film-panel-hour/film-panel-hour.component';
import { HttpClientModule } from '@angular/common/http';


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

    
    
  ],
  imports: [
    BrowserModule,
    IconsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
