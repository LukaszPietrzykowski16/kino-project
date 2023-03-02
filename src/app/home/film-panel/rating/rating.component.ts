import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RatingService } from '../services/rating.service';
import { starsModalComponent } from '../stars-modal.component';

@Component({
  selector: 'app-rating',
  standalone: true,
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent {
  private ratingService = inject(RatingService);
  public dialog = inject(MatDialog);

  @Input() filmId!: number;

  showModal(filmId: number) {
    this.ratingService.setFilmId(filmId);
    const dialogRef = this.dialog.open(starsModalComponent);
  }
}
