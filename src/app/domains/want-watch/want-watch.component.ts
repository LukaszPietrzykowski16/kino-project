import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/authentication/auth.service';
import { Film } from 'src/app/home/film-panel/film-panel.component';
import { UserService } from 'src/app/home/film-panel/services/user.service';
import { ApiServiceService } from 'src/app/home/services/api-service.service';
import { FilmService } from './film/film.service';

@Component({
  selector: 'app-want-watch',
  templateUrl: './want-watch.component.html',
  styleUrls: ['./want-watch.component.css'],
})
export class WantWatchComponent {
  private userId: number | undefined;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private filmService: FilmService
  ) {}

  filmService$ = this.filmService.getFilms;

  moviesArray: Array<Number> = [];

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.userId = user.id;
    });

    this.userService.getUser(this.userId).subscribe((movie) => {
      this.moviesArray = [...this.moviesArray, ...movie.movies];
      for (let i = 0; i < this.moviesArray.length; i++) {
        this.filmService.getFilm(i);
      }
    });
  }

  removeFilm(filmId: number) {
    this.moviesArray = this.moviesArray.filter((ele) => ele != filmId);
    this.filmService.removeFilm(this.moviesArray);
  }
}
