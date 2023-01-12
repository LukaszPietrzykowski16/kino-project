import { Component } from '@angular/core';
import { FormService } from '../../../form.service';
import { QrService } from '../../../qr.service';
import { Ticket } from '../../cinema-hall/reservation/reservation.component';
import { FormInfoService } from '../../../form-info.service';

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
