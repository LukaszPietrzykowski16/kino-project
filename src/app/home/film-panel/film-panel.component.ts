import { Component, inject, Input } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { map, take } from 'rxjs';
import { Film } from 'angular-feather/icons';
import { CinemaHallService } from '../../domains/cinema-hall/services/cinema-hall.service';
import { AuthService } from 'src/app/auth/authentication/auth.service';
import { SendMovieService } from './services/send-movie.service';
import { UserService } from './services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { starsModal } from './stars-modal.component';

export interface Screening {
  filmId: number;
  premiere: boolean;
  rating: number;
  date: string;
  hours: Array<string>;
  film: Film;
}

export interface Film {
  id: number;
  title: string;
  types: string;
  image: string;
  description: string;
  rating: number;
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
  isLogin = false;

  userId: number = NaN;
  moviesArray: Array<Number> = [];

  private date = new Date();
  now = this.date.getHours();
  selectedDay: string = '';

  constructor(
    private cinemaService: CinemaHallService,
    private authService: AuthService,
    private movieService: SendMovieService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  screenings$ = this.apiService.screenings$;
  date$ = this.apiService.date$;
  // dateValue = this.apiService.dateValue;

  sendMovie(filmId: number) {
    this.moviesArray = [...this.moviesArray, ...[filmId]];
    const set = new Set(this.moviesArray);
    this.movieService.postMovie(this.userId, Array.from(set));
  }

  showModal() {
    const dialogRef = this.dialog.open(starsModal);
  }

  changeToString(test: string) {
    return Number(test[0] + test[1]);
  }

  moreDetails(title: string, hour: string) {
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
      });

      this.userService.getUser(this.userId).subscribe((movie) => {
        this.moviesArray = [...this.moviesArray, ...movie.movies];
      });
    }
  }
}
