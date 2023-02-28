import { Component, inject, Input } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { map, take } from 'rxjs';
import { Film } from 'angular-feather/icons';
import { CinemaHallService } from '../../domains/cinema-hall/services/cinema-hall.service';
import { AuthService } from 'src/app/auth/authentication/auth.service';
import { SendMovieService } from './services/send-movie.service';
import { UserService } from './services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { starsModalComponent } from './stars-modal.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { UserTicketService } from 'src/app/domains/user-tickets/services/user-ticket.service';
import { RatingService } from './services/rating.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification/notification.component';
import TicketApiService from 'src/app/domains/cinema-hall/services/ticket-api.service';
import { TicketsService } from 'src/app/domains/cinema-hall/reservation/services/tickets.service';

export interface Screening {
  filmId: number;
  premiere: boolean;
  date: string;
  hours: Array<string>;
}

export interface Film {
  id: number;
  title: string;
  types: string;
  image: string;
  description: string;
  rating: number;
  length: number;
}

export interface Repertoire {
  filmId: number;
  premiere: boolean;
  rating: number;
  date: string;
  hours: Array<string>;
  film: Film;
}

@Component({
  selector: 'app-film-panel',
  templateUrl: './film-panel.component.html',
  styleUrls: ['./film-panel.component.css'],
})
export class FilmPanelComponent {
  private apiService = inject(ApiServiceService);
  private store = inject<Store<AppState>>(Store);
  private userData = inject(UserTicketService);
  private ratingService = inject(RatingService);
  private ticketService = inject(TicketsService);

  isLogin = false;
  userId: number = NaN;
  moviesArray: Array<Number> = [];
  durationInSeconds = 3;

  private date = new Date();
  now = this.date.getHours();
  selectedDay: string = '';

  constructor(
    private cinemaService: CinemaHallService,
    private authService: AuthService,
    private movieService: SendMovieService,
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  screenings$ = this.apiService.screenings$;
  date$ = this.apiService.date$;
  ratings$ = this.userData.ratings$;

  sendMovie(filmId: number) {
    this.openSnackBar();
    this.moviesArray = [...this.moviesArray, ...[filmId]];
    const set = new Set(this.moviesArray);
    this.movieService.postMovie(this.userId, Array.from(set));
  }

  openSnackBar() {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  showModal(filmId: number) {
    this.ratingService.setFilmId(filmId);
    const dialogRef = this.dialog.open(starsModalComponent);
  }

  user$ = this.store.select('User');

  changeToString(test: string) {
    return Number(test[0] + test[1]);
  }

  moreDetails(title: string, hour: string) {
    this.ticketService.cleanState();
    this.date$
      .pipe(take(1))
      .subscribe((value) => (this.selectedDay = value.dateString))
      .unsubscribe();

    this.cinemaService.setStrings(title, hour, this.selectedDay);
  }

  ngOnInit() {
    this.apiService.getShowing();

    this.authService.isAuth$.subscribe((login) => {
      this.isLogin = login.hasAuth;
    });

    if (this.isLogin === true) {
      this.authService.user$.subscribe((user) => {
        this.userId = user.id;
        this.userData.mainPageInfo();
      });

      this.userService.getUser(this.userId).subscribe((movie) => {
        this.moviesArray = [...this.moviesArray, ...movie.movies];
      });
    }
  }
}
