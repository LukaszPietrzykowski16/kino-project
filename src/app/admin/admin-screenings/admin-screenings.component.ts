import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { FilmService } from 'src/app/domains/want-watch/film/film.service';
import { Film, Screening } from 'src/app/home/film-panel/film-panel.component';
import { ScreeningAdminState } from '../admin.module';
import { FilmServiceService } from '../services/film-service.service';

import { screeningActions } from '../store/admin.action';
import { AdminFilmState } from '../store/admin.interface';

@Component({
  selector: 'app-admin-screenings',
  templateUrl: './admin-screenings.component.html',
  styleUrls: ['./admin-screenings.component.scss'],
})
export class AdminScreeningsComponent {
  private filmService = inject(FilmServiceService);
  private store = inject<Store<ScreeningAdminState>>(Store);
  checked = false;
  screeningForm: FormGroup = new FormGroup({});

  private allFilms$$ = new BehaviorSubject<Film[]>([]);

  get allFilms$() {
    return this.allFilms$$.asObservable();
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.store.dispatch(screeningActions.getScreenings());
    this.screeningForm = this.fb.group({
      film: [null, [Validators.required, Validators.minLength(4)]],
      date: [null, [Validators.required]],
      premier: [false, [Validators.required]],
    });
    this.store.select('AdminScreening').subscribe((test) => {
      console.log(test);
    });
    this.fetchFilms();
  }

  get filmCtrl() {
    return this.screeningForm.controls.film;
  }

  get dateCtrl() {
    return this.screeningForm.controls.date;
  }

  setValue(index: number) {
    this.screeningForm.controls.film.setValue(index);
  }

  addScreening() {
    const screeningNew: Screening = {
      filmId: NaN,
      premiere: false,
      date: this.dateCtrl.value,
      hours: [
        '09:00',
        '10:30',
        '13:30',
        '15:30',
        '17:00',
        '21:00',
        '22:00',
        '23:00',
      ],
    };
    this.store.dispatch(
      screeningActions.addSingleScreening({ screenings: screeningNew })
    );
  }

  fetchFilms() {
    this.filmService.getFilms().subscribe((test) => {
      this.allFilms$$.next(test);
    });
  }
}
