import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SingleCinemaHall } from '../store/hall.interface';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HallComponent {
  @Input() hall!: SingleCinemaHall;
  value: number = 0;

  ngOnInit() {
    console.log(this.hall.columns, this.hall.row);

    this.value = this.hall.columns * this.hall.row;
  }
}
