import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserTicketService } from 'src/app/domains/user-tickets/services/user-ticket.service';
import { RatingValueService } from '../services/rating-value.service';
import { RatingService } from '../services/rating.service';
import { starsModalComponent } from '../stars-modal.component';

@Component({
  selector: 'app-rating',
  standalone: true,
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  imports: [NgIf, NgFor, AsyncPipe],
})
export class RatingComponent {
  private ratingService = inject(RatingService);
  public dialog = inject(MatDialog);
  private userData = inject(UserTicketService);
  private ratingValueService = inject(RatingValueService);

  rating = true;

  @Input() filmId!: number;

  showModal(filmId: number) {
    // this.ratingService.setFilmId(filmId);
    const dialogRef = this.dialog.open(starsModalComponent);
  }

  ngOnInit() {}
}
