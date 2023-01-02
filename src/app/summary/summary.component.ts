import { Component } from '@angular/core';
import { FormService } from '../form.service';
import { QrService } from '../qr.service';
import { Ticket } from '../reservation/reservation.component';

export interface qrCode {
    url: string
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  title: Array<String | undefined> = [];
  seats: Array<Ticket> = [];

  url: string | undefined;

  constructor(private formService: FormService, private qrService: QrService) {}

  ngOnInit() {
    this.title = this.formService.displayTitle();
    this.seats = this.formService.displaySeats();
    this.qrService.getQr().subscribe((qrCode) => {
     this.url = qrCode.url 
    });
  }
}