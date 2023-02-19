import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { ChangeDayService } from './services/change-day.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.css'],
})
export class DataPanelComponent {
  changeDayService = inject(ChangeDayService);
  apiService = inject(ApiServiceService);

  id: string | undefined;

  @Output() buttonClicked = new EventEmitter<string>();

  constructor(private activatedRoute: ActivatedRoute) {}

  today = this.changeDayService.formatDate(new Date());
  nextDays = new Date();
  arr: Array<string> = [];

  changeDay(day: string) {
    this.today = day;
    console.log(this.today);
    this.apiService.updateDate(this.today);
    this.buttonClicked.emit(this.today);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params['date'] !== 'undefined') {
        this.today = params['date'];
      } else {
        this.id = '';
      }
    });

    for (let i = 0; i < 7; i++) {
      let nextDay: Date = new Date(this.nextDays);
      nextDay.setDate(this.nextDays.getDate() + i);
      let exactDay = this.changeDayService.formatDate(nextDay);
      // to change
      this.arr.push(exactDay);
    }
  }
}
