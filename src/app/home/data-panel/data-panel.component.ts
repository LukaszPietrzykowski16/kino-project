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
  private changeDayService = inject(ChangeDayService);
  private apiService = inject(ApiServiceService);

  @Output() buttonClicked = new EventEmitter<string>();

  constructor(private activatedRoute: ActivatedRoute) {}

  today = this.changeDayService.formatDate(new Date());
  nextDays = new Date();
  arr: Array<string> = [];

  changeDay(day: string) {
    this.today = day;
    this.apiService.updateDate(this.today);
  }

  ngOnInit(): void {
    console.log(this.today);
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params['date'] !== 'undefined') {
        this.today = params['date'];
        this.apiService.updateDate(this.today);
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
