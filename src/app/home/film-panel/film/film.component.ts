import { Component, inject, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiServiceService } from '../../services/api-service.service';
import { Film, Repertoire, Screening } from '../film-panel.component';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})
export class FilmComponent {
  private apiService = inject(ApiServiceService);
  @Input() film!: Film;

  film$ = this.apiService.film$;

  ngOnInit() {
    console.log(this.film);
  }
}
