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

  ngOnInit() {
    for (let i = 0; i <= 10; i++) {
      this.numberOfStars = [...this.numberOfStars, ...[i]];
    }
  }
}
