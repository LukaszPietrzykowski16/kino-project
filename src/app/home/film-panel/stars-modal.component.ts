import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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

  setStar(numberOfStar: number) {
    this.status = !this.status;
    this.starValue = numberOfStar;
  }

  sendRating() {
    if (this.starValue === 0) {
      return;
    }
    console.log('hello');
    // sendRatingToBackend()
  }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.numberOfStars = [...this.numberOfStars, ...[i]];
    }
  }
}
