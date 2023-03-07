import { Component, inject, Input } from '@angular/core';
import { UserTicketService } from 'src/app/domains/user-tickets/services/user-ticket.service';
import { Film } from '../film-panel.component';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})
export class FilmComponent {
  private userData = inject(UserTicketService);

  @Input() film!: Film;
  @Input() premiere!: boolean;

  ratings$ = this.userData.ratings$;

  longDescription = true;

  showMoreDescription() {
    this.longDescription = !this.longDescription;
  }
}
