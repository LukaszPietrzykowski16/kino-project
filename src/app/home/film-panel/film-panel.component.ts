import { Component, Input } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { map } from 'rxjs';
import { Film } from 'angular-feather/icons';
import { CinemaHallService } from '../../domains/cinema-hall/services/cinema-hall.service';
import { AuthService } from 'src/app/auth/authentication/auth.service';
import { SendMovieService } from './services/send-movie.service';
import { UserService } from './services/user.service';
import { ChangeHoursService } from './services/change-hours.service';
import { ChangeDayService } from '../data-panel/services/change-day.service';

export interface Screening {
  title: any;
  filmId: number;
  rating: number;
  date: string;
  hours: Array<string>;
}

export interface Film {
  title: string;
  types: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-film-panel',
  templateUrl: './film-panel.component.html',
  styleUrls: ['./film-panel.component.css'],
})
export class FilmPanelComponent {
  description: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolore quisquam, atque molestias distinctio ab numquam hic ipsa a dolores rerum aliquam nisi autem voluptate minima eaque veritatis ratione voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolore quisquam, atque molestias distinctio ab numquam hic ipsa a dolores rerum aliquam nisi autem voluptate minima eaque veritatis ratione voluptatem!';

  screeningData: Array<Screening> = [];
  isLogin = false;
  @Input() item: string = '';
  shortDescription: string = this.description.substring(0, 240);
  flag: boolean = true;
  newArr: Array<string> = [];
  arr: Array<any> = [];
  hours: Array<string> = [];
  userId: number = NaN;
  moviesArray: Array<Number> = [];
  hoursArr: Array<string> | undefined;
  d = new Date();
  now = this.d.getHours();

  constructor(
    private apiService: ApiServiceService,
    private cinemaService: CinemaHallService,
    private authService: AuthService,
    private movieService: SendMovieService,
    private userService: UserService
  ) {}

  sendMovie(filmId: any) {
    this.moviesArray = [...this.moviesArray, ...[filmId.id]];
    const set = new Set(this.moviesArray);
    this.movieService.postMovie(this.userId, Array.from(set));
  }

  more() {
    if (this.flag === true) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }

  ngOnChanges(): void {
    this.arr = [];
    this.apiService
      .changeDate(this.item)
      .subscribe((response) => (this.screeningData = response));
    this.screeningData.map((test) => {
      this.apiService
        .getFilms(test.filmId)
        .subscribe((test) => this.arr.push(test));
    });
    this.screeningData.map((test) => {
      this.hoursArr = test.hours;
    });
  }

  changeToString(test: any) {
    // god forgive me for i have sinned
    return Number(test[0] + test[1]);
  }

  moreDetails(title: string, hour: string) {
    this.cinemaService.setStrings(title, hour, this.item);
  }

  ngOnInit() {
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
