import { Component, inject, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserTicketService } from 'src/app/domains/user-tickets/services/user-ticket.service';
import { ApiServiceService } from '../../services/api-service.service';
import { Film, Repertoire, Screening } from '../film-panel.component';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})
export class FilmComponent {
  private userData = inject(UserTicketService);

  @Input() film!: Film;
  @Input() premiere!: boolean;

  longDescription = true;
  ratings$ = this.userData.ratings$;

  showMoreDescription() {
    this.longDescription = !this.longDescription;
  }
}
