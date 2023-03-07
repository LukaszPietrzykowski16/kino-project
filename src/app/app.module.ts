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
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { ReservationComponent } from './domains/cinema-hall/reservation/reservation.component';
import { FormsPanelComponent } from './domains/form/forms-panel/forms-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsMainComponent } from './domains/form/forms-main/forms-main.component';
import { FormsTitleComponent } from './domains/form/forms-title/forms-title.component';
import { TicketsPriceComponent } from './domains/cinema-hall/tickets-price/tickets-price.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { UserState } from './auth/store/user.interface';
import AuthModule from './auth/auth.module';
import { LoginGuard } from './auth/guards/login.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { FilmComponent } from './home/film-panel/film/film.component';
import { MainDateComponent } from './home/main/main-date/main-date.component';
import { CommonModule } from '@angular/common';
import { UserTicketsComponent } from './domains/user-tickets/user-tickets.component';
import { UserTicketComponent } from './domains/user-tickets/user-ticket/user-ticket.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumbersOnlyDirective } from 'src/app/shared/directives/numbers-only.directive';
import { NotAdminGuard } from './shared/guards/no-admin.guard';
import { NotificationComponent } from './home/film-panel/notification/notification.component';
import { SelectedSeatGuard } from './shared/guards/selected-seat.guard';
import { AdminModule } from './admin';
import { MatMenuModule } from '@angular/material/menu';
import { WantToWatchComponent } from './home/film-panel/want-to-watch/want-to-watch.component';
import { RatingComponent } from './home/film-panel/rating/rating.component';
import { UserTicketReservationComponent } from './domains/user-tickets/user-ticket-reservation/user-ticket-reservation.component';
import { NoSpacesDirective } from './shared/directives/no-space.directive';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';

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
    ErrorPageComponent,
    ReservationComponent,
    FormsPanelComponent,
    FormsTitleComponent,
    FormsMainComponent,
    TicketsPriceComponent,
    FilmComponent,
    MainDateComponent,
    UserTicketsComponent,
    UserTicketComponent,
    NotificationComponent,
  ],
  providers: [UserTicketsComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    IconsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    MatDialogModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatSnackBarModule,
    NumbersOnlyDirective,
    NoSpacesDirective,
    AdminModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot([]),
    RouterModule.forRoot([
      {
        path: '',
        children: [
          {
            path: 'login',
            loadChildren: () => import('./auth/auth.module'),
            canActivate: [NotAdminGuard, LoginGuard],
          },
          {
            path: 'admin',
            loadChildren: () =>
              import('./admin/admin.module').then(
                ({ AdminModule }) => AdminModule
              ),
            canActivate: [AuthGuard],
          },
          {
            path: 'date/:date',
            loadChildren: () =>
              import('./home/main/main.module').then(
                ({ MainModule }) => MainModule
              ),
            canActivate: [NotAdminGuard],
          },
          {
            path: 'tickets',
            loadChildren: () =>
              import('./domains/user-tickets/user-tickets.module').then(
                ({ UserTicketsModule }) => UserTicketsModule
              ),
            canActivate: [NotAdminGuard, AuthGuard],
          },
          {
            path: 'form',
            loadChildren: () =>
              import('./domains/form/form.module').then(
                ({ FormModule }) => FormModule
              ),

            canActivate: [SelectedSeatGuard],
          },
          {
            path: 'summary',
            loadComponent: () => import('./domains/summary/summary.component'),
            canActivate: [SelectedSeatGuard],
          },
          {
            path: 'want-watch',
            loadComponent: () =>
              import('./domains/want-watch/want-watch.component'),
            canActivate: [AuthGuard, NotAdminGuard],
          },
          {
            path: 'ticket/:id',
            loadComponent: () => import('./domains/tickets/tickets.component'),
            canActivate: [NotAdminGuard],
          },
        ],
      },
    ]),
    BrowserAnimationsModule,
    WantToWatchComponent,
    RatingComponent,
    UserTicketReservationComponent,
  ],
})
export class AppModule {}
