import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilmService } from 'src/app/domains/want-watch/film/film.service';
import { RatingService } from '../services/rating.service';
import { starsModalComponent } from '../stars-modal.component';

@Component({
  selector: 'app-rating',
  standalone: true,
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  imports: [NgIf, NgFor, AsyncPipe],
  providers: [RatingService],
})
export class RatingComponent {
  private ratingService = inject(RatingService);
  private filmService = inject(FilmService);
  public dialog = inject(MatDialog);

  ratings$ = this.ratingService.ratings$;

  rating = true;
  userRate = 0;

  @Input() filmId!: number;

  showModal(filmId: number) {
    const dialogRef = this.dialog.open(starsModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.userRate = result;
      this.filmService.addWantToWatch(filmId, this.userRate);
    });
  }

  ngOnInit() {
    this.ratingService.checkRating(this.filmId).subscribe((test) => {
      test.map((test) => {
        this.ratingService.getRatings(test);
      });
    });
    this.ratings$.subscribe((test) => {
      this.userRate = test.rating;
    });
  }
}
