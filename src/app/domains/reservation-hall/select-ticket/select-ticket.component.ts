import { Component, Input } from '@angular/core';
import { Order } from '../store/hall.interface';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-select-ticket',
  templateUrl: './select-ticket.component.html',
  styleUrls: ['./select-ticket.component.scss'],
  standalone: true,
  imports: [MatSelectModule, NgFor, NgIf],
})
export class SelectTicketComponent {
  @Input() order!: Order;
}
