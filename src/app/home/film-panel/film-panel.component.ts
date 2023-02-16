import { Component, inject, Input } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { map } from 'rxjs';
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
  description: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolore quisquam, atque molestias distinctio ab numquam hic ipsa a dolores rerum aliquam nisi autem voluptate minima eaque veritatis ratione voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolore quisquam, atque molestias distinctio ab numquam hic ipsa a dolores rerum aliquam nisi autem voluptate minima eaque veritatis ratione voluptatem!';

  apiService = inject(ApiServiceService);

  screeningData: Array<Screening> = [];
  isLogin = false;
  @Input() item: string = '';
  shortDescription: string = this.description.substring(0, 240);
  newArr: Array<string> = [];
  arr: Array<any> = [];
  hours: Array<string> = [];
  userId: number = NaN;
  moviesArray: Array<Number> = [];
  hoursArr: Array<string> | undefined;
  d = new Date();
  now = this.d.getHours();

  constructor(
    private cinemaService: CinemaHallService,
    private authService: AuthService,
    private movieService: SendMovieService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  films$ = this.apiService.films$;
  screenings$ = this.apiService.screenings$;

  sendMovie(filmId: any) {
    this.moviesArray = [...this.moviesArray, ...[filmId]];
    const set = new Set(this.moviesArray);
    this.movieService.postMovie(this.userId, Array.from(set));
  }

  isPremiere = false;

  getFilms() {
    this.arr = [];
    this.apiService
      .changeDate(this.item)
      .subscribe((response) => (this.screeningData = response));
  }

  showModal() {
    const dialogRef = this.dialog.open(starsModal);
  }

  changeToString(test: any) {
    // god forgive me for i have sinned
    return Number(test[0] + test[1]);
  }

  moreDetails(title: string, hour: string) {
    this.cinemaService.setStrings(title, hour, this.item);
  }

  ngOnInit() {
    this.apiService.getFilms();
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
