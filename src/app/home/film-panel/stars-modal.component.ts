import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RatingService } from './services/rating.service';

@Component({
  selector: 'stars-modal',
  standalone: true,
  templateUrl: 'stars-modal.component.html',
  imports: [CommonModule],
})
export class starsModalComponent {
  numberOfStars: Array<number> = [];
  starValue = 0;
  status: boolean = false;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<starsModalComponent>
  ) {}

  private ratingService = inject(RatingService);

  setStar(numberOfStar: number) {
    this.status = !this.status;
    this.starValue = numberOfStar;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  sendRating() {
    this.closeDialog();
    if (this.starValue === 0) {
      return;
    }
    // mocking 11 for testing porpuse
    this.ratingService.sendRating(11, this.starValue, 1);
  }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.numberOfStars = [...this.numberOfStars, ...[i]];
    }
  }
}
