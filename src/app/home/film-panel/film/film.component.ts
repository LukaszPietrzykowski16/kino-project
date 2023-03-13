import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserTicketService } from 'src/app/domains/user-tickets/services/user-ticket.service';

import { ApiServiceService } from '../../services/api-service.service';
import { Film } from '../film-panel.component';

export interface FilmData {
  title: string;
  hour: string;
}

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent {
  @Input() film!: Film;
  @Input() hours!: Array<string>;
  @Input() premiere!: boolean;
  @Input() selectedDay!: string;
  @Input() now!: number;

  @Output() handleChangingDate = new EventEmitter<FilmData>();

  private userData = inject(UserTicketService);
  private apiService = inject(ApiServiceService);

  longDescription = true;

  date$ = this.apiService.date$;
  ratings$ = this.userData.ratings$;

  changeToString(test: string) {
    console.log(test);
    console.log(Number(test[0] + test[1]));
    return Number(test[0] + test[1]);
  }

  moreDetails(title: string, hour: string) {
    this.handleChangingDate.emit({ title: title, hour: hour });
  }

  showMoreDescription() {
    this.longDescription = !this.longDescription;
  }
}
