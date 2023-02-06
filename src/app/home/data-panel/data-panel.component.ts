import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ChangeDayService } from './services/change-day.service';

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.css'],
})
export class DataPanelComponent {
  changeDayService = inject(ChangeDayService);

  @Output() buttonClicked = new EventEmitter();

  today = this.changeDayService.formatDate(new Date());
  nextDays = new Date();
  arr: Array<string> = [];

  changeDay(day: string) {
    this.today = day;
    this.buttonClicked.emit(this.today);
  }

  ngOnInit(): void {
    console.log(this.today);
    for (let i = 0; i < 7; i++) {
      let nextDay: Date = new Date(this.nextDays);
      nextDay.setDate(this.nextDays.getDate() + i);
      let exactDay = this.changeDayService.formatDate(nextDay);
      this.arr.push(exactDay);
    }
  }
}
