import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/authentication/auth.service';
import { UserService } from 'src/app/home/film-panel/services/user.service';

@Component({
  selector: 'app-want-watch',
  templateUrl: './want-watch.component.html',
  styleUrls: ['./want-watch.component.css'],
})
export class WantWatchComponent {
  private userId: number | undefined;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}
  moviesArray: Array<Number> = [];

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.userId = user.id;
    });

    this.userService.getUser(this.userId).subscribe((movie) => {
      this.moviesArray = [...this.moviesArray, ...movie.movies];
    });
  }
}
