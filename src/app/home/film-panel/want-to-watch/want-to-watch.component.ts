import { NgIf } from '@angular/common';
import { Component, inject, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/authentication/auth.service';
import { SendMovieService } from '../services/send-movie.service';
import { UserService } from '../services/user.service';
import { WantWatchService } from '../services/want-watch.service';

@Component({
  selector: 'app-want-to-watch',
  standalone: true,
  templateUrl: './want-to-watch.component.html',
  styleUrls: ['./want-to-watch.component.css'],
  imports: [NgIf],
})
export class WantToWatchComponent {
  private movieService = inject(SendMovieService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private wantWatchService = inject(WantWatchService);

  @Input() filmId!: number;
  wantWatch = true;
  // moviesArray: Array<Number> = [];
  isLogin = false;
  userId: number = NaN;

  getRatingArray$ = this.wantWatchService.getRatingArray$;

  sendAddMovie(filmId: number) {
    this.wantWatchService.addFilm(filmId);
    this.wantWatch = !this.wantWatch;
    this.openSnackBar();
    // this.moviesArray = [...this.moviesArray, ...[filmId]];
    // const set = new Set(this.moviesArray);
    // this.movieService.postMovie(this.userId, Array.from(set));
  }

  openSnackBar() {
    // this.snackBar.openFromComponent(NotificationComponent, {
    //   duration: this.durationInSeconds * 1000,
    // });
  }

  sendRemoveMovie(filmId: number) {
    this.wantWatchService.removeFilm(filmId);
    this.wantWatch = !this.wantWatch;
    this.openSnackBar();
    // this.moviesArray = this.moviesArray.filter((item) => {
    //   return item !== filmId;
    // });
    // this.movieService.postMovie(this.userId, this.moviesArray);
  }

  ngOnInit() {
    this.authService.isAuth$.subscribe((login) => {
      this.isLogin = login.hasAuth;
    });

    this.userService.getUser(this.userId).subscribe((movie) => {
      this.wantWatchService.addFilmsArray(movie.movies);
    });
    if (this.isLogin === true) {
      this.authService.user$.subscribe((user) => {
        this.userId = user.id;
      });
    }
  }
}
