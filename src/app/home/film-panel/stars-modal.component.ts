import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RatingService } from './services/rating.service';

@Component({
  selector: 'stars-modal',
  standalone: true,
  templateUrl: 'stars-modal.component.html',
  imports: [CommonModule],
})
export class starsModal {
  numberOfStars: Array<number> = [];
  starValue = 0;
  status: boolean = false;

  private ratingService = inject(RatingService);

  setStar(numberOfStar: number) {
    this.status = !this.status;
    this.starValue = numberOfStar;
  }

  sendRating() {
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
