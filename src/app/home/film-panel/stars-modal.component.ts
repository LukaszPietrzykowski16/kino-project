import { CommonModule } from '@angular/common';
import { Component, inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RatingValueService } from './services/rating-value.service';
import { RatingService } from './services/rating.service';

@Component({
  selector: 'stars-modal',
  standalone: true,
  templateUrl: 'stars-modal.component.html',
  imports: [CommonModule],
})
export class starsModalComponent {
  private ratingService = inject(RatingService);
  private ratingValueService = inject(RatingValueService);

  numberOfStars: Array<number> = [];
  starValue = 0;
  status: boolean = false;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<starsModalComponent>
  ) {}

  setStar(numberOfStar: number) {
    this.status = !this.status;
    this.starValue = numberOfStar;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  sendValue(): void {
    this.dialogRef.close(this.starValue);

    // this.closeDialog();
    // if (this.starValue === 0) {
    //   return;
    // }
    // // this.ratingValueService.updateValue(false, this.starValue);
    // // mocking 11 for testing porpuse
    // this.ratingService.patchRatings(3, this.starValue);
    // this.ratingEvent.emit();
  }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.numberOfStars = [...this.numberOfStars, ...[i]];
    }
  }
}
