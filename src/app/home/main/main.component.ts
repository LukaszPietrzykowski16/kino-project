import { Component, inject, Input } from '@angular/core';
import { ChangeDayService } from '../data-panel/services/change-day.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  changeDayService = inject(ChangeDayService);

  currentItem = this.changeDayService.formatDate(new Date());

  showNextFilm($event: any) {
    this.currentItem = $event;
  }
}
