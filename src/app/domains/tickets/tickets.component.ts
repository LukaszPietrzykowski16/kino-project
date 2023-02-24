import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tickets',
  standalone: true,
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
  imports: [NgIf, AsyncPipe, NgFor],
})
export default class TicketsComponent {}
