import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Position, SingleCinemaHall } from '../store/hall.interface';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HallComponent {
  @Input() hall!: SingleCinemaHall;

  @Output() buttonClicked = new EventEmitter<Position>();

  getStyles() {
    return `grid-template-columns: repeat(${this.hall.row}, 1.5fr)`;
  }

  emitClickingOnSeat(seat: number) {
    this.buttonClicked.emit({ position: seat });
  }
}
