import { NgIf } from '@angular/common';
import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-want-to-watch',
  standalone: true,
  templateUrl: './want-to-watch.component.html',
  styleUrls: ['./want-to-watch.component.css'],
  imports: [NgIf],
})
export class WantToWatchComponent {
  @Input() filmId!: number;
  wantWatch = true;

  sendAddMovie(filmId: number) {
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
    this.wantWatch = !this.wantWatch;
    this.openSnackBar();
    // this.moviesArray = this.moviesArray.filter((item) => {
    //   return item !== filmId;
    // });
    // this.movieService.postMovie(this.userId, this.moviesArray);
  }
}
