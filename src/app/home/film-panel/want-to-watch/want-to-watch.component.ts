import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/authentication/auth.service';
import { NotificationComponent } from '../notification/notification.component';
import { RatingService } from '../services/rating.service';
import { SendMovieService } from '../services/send-movie.service';
import { UserService } from '../services/user.service';
import { WantWatchService } from '../services/want-watch.service';

@Component({
  selector: 'app-want-to-watch',
  standalone: true,
  templateUrl: './want-to-watch.component.html',
  styleUrls: ['./want-to-watch.component.css'],
  imports: [NgIf, AsyncPipe, NgFor],
})
export class WantToWatchComponent {
  private movieService = inject(SendMovieService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private wantWatchService = inject(WantWatchService);
  private ratingService = inject(RatingService);
  private snackBar = inject(MatSnackBar);

  @Input() filmId!: number;
  wantWatch = true;
  isLogin = false;
  userId: number = NaN;
  durationInSeconds = 3;

  getRatingArray$ = this.wantWatchService.getRatingArray$;

  sendAddMovie(filmId: number) {
    this.wantWatch = !this.wantWatch;
    this.wantWatchService.addFilm(filmId);
    this.openSnackBar('Dodano film do obejrzenia!');
  }

  openSnackBar(titleValue: string) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: titleValue,
      duration: this.durationInSeconds * 1000,
    });
  }

  sendRemoveMovie(filmId: number) {
    this.wantWatch = !this.wantWatch;
    this.wantWatchService.removeFilm(filmId);

    this.openSnackBar('Usunięto film do obejrzenia!');
  }

  ngOnInit() {
    this.authService.isAuth$.subscribe((login) => {
      this.isLogin = login.hasAuth;
    });
    if (this.isLogin === true) {
      this.authService.user$.subscribe((user) => {
        this.userId = user.id;
      });
    }

    this.userService.getUser(this.userId).subscribe((movie) => {
      this.wantWatchService.addFilmsArray(movie.movies);
    });

    this.getRatingArray$
      .pipe(
        map((rating) =>
          rating.map((ratingValue) => {
            if (ratingValue === this.filmId) {
              this.wantWatch = false;
            }
          })
        )
      )
      .subscribe();
  }
}
