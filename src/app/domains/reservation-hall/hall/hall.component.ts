import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SingleCinemaHall } from '../store/hall.interface';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HallComponent {
  @Input() hall!: SingleCinemaHall;

  getStyles() {
    return `grid-template-columns: repeat(${this.hall.row}, 1.5fr)`;
  }
}
