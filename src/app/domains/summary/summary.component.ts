import { Component } from '@angular/core';

import { QrService } from '../../qr.service';
import { Ticket } from '../cinema-hall/reservation/reservation.component';
import { FormsPanelComponent } from '../form/forms-panel/forms-panel.component';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { FormService } from '../form/services/form.service';
import { FormInfoService } from '../form/services/form-info.service';

export interface qrCode {
  url: string;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  title: Array<String | undefined> = [];
  seats: Array<Ticket> = [];

  name: Array<String | null> = [];

  url: string | undefined;

  constructor(
    private formService: FormService,
    private qrService: QrService,
    private formInfoService: FormInfoService
  ) {}

  ngOnInit() {
    this.title = this.formService.displayTitle();
    this.seats = this.formService.displaySeats();
    this.name = this.formInfoService.getInformation();
    this.qrService.getQr().subscribe((qrCode) => {
      this.url = qrCode.url;
    });
  }
}
