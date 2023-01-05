import { Component } from '@angular/core';
import { FormService } from '../form.service';
import { QrService } from '../qr.service';
import { Ticket } from '../reservation/reservation.component';
import { FormsPanelComponent } from '../forms-panel/forms-panel.component';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { SummaryDataService } from '../summary-data.service';

export interface qrCode {
    url: string,
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers: [SummaryDataService]
})
export class SummaryComponent {
  title: Array<String | undefined> = [];
  seats: Array<Ticket> = [];

  name: string | null = ''
  url: string | undefined;

  constructor(private formService: FormService, private qrService: QrService, private summaryData: SummaryDataService) {}

  ngOnInit() {
    this.name = this.summaryData.displayInformation()
    this.title = this.formService.displayTitle();
    this.seats = this.formService.displaySeats();
    this.qrService.getQr().subscribe((qrCode) => {
     this.url = qrCode.url 
    });
  }
}