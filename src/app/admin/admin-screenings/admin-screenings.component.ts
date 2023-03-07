import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Film, Screening } from 'src/app/home/film-panel/film-panel.component';
import { ScreeningAdminState } from '../admin.module';
import { FilmServiceService } from '../services/film-service.service';
import { screeningActions } from '../store/admin.action';
import { ExactScreeningService } from './services/exact-screening.service';
import { FilmLimiterService } from './services/film-limiter.service';
import { ChangeDayService } from 'src/app/home/data-panel/services/change-day.service';

export interface ExpInterface {
  exp: string;
}

@Component({
  selector: 'app-admin-screenings',
  templateUrl: './admin-screenings.component.html',
  styleUrls: ['./admin-screenings.component.scss'],
})
export class AdminScreeningsComponent {
  private exactScreening = inject(ExactScreeningService);
  private filmLimiter = inject(FilmLimiterService);
  private changeDayService = inject(ChangeDayService);

  array$ = this.filmLimiter.newArr$;

  page = 0;
  questions = [
    'Podaj datę seansu',
    'Wybierz film, jeżeli nie ma tutaj jakiegoś filmu, jest już z nim seans',
    'Podaj godzinę',
    'Podsumowanie',
    'Seans został dodany',
  ];

  nextPage() {
    if (this.page === 0) {
      this.exactScreening.getScreening(this.dateCtrl.value);
      this.filmLimiter.limitFilms();
    }
    if (this.page === 1) {
      if (this.filmCtrl.value === null) {
        this.page = 0;
      }
    }
    if (this.page === 2) {
      this.addScreening();
      this.page++;
    } else {
      this.page++;
    }
  }

  previousPage() {
    if (this.page === 0) {
      return;
    } else {
      this.page--;
    }
  }

  private filmService = inject(FilmServiceService);
  private store = inject<Store<ScreeningAdminState>>(Store);
  checked = false;
  screeningForm: FormGroup = new FormGroup({});

  skillsForm!: FormGroup;

  private allFilms$$ = new BehaviorSubject<Film[]>([]);

  get allFilms$() {
    return this.allFilms$$.asObservable();
  }

  constructor(private fb: FormBuilder) {}

  newSkill(): FormGroup {
    return this.fb.group({
      exp: '',
    });
  }

  ngOnInit(): void {
    this.skillsForm = this.fb.group({
      name: '',
      skills: this.fb.array([]),
    });

    this.store.dispatch(screeningActions.getScreenings());
    this.screeningForm = this.fb.group({
      film: [null, [Validators.required]],
      date: [null, [Validators.required]],
      premier: [false, [Validators.required]],
    });
    this.fetchFilms();
  }

  get skills(): FormArray {
    return this.skillsForm.get('skills') as FormArray;
  }

  get exp(): FormArray {
    return this.skillsForm.get('exp') as FormArray;
  }

  get filmCtrl() {
    return this.screeningForm.controls.film;
  }

  get dateCtrl() {
    return this.screeningForm.controls.date;
  }

  get premierCtrl() {
    return this.screeningForm.controls.premier;
  }

  setValue(index: number) {
    this.screeningForm.controls.film.setValue(index);
  }

  addScreening() {
    this.onSubmit();
  }

  sendScreening() {
    this.page = 4;
    const screeningNew: Screening = {
      filmId: this.filmCtrl.value,
      premiere: this.premierCtrl.value,
      date: this.changeDayService.formatDate(this.dateCtrl.value),
      hours: this.finalArr,
    };
    this.store.dispatch(
      screeningActions.addSingleScreening({ screenings: screeningNew })
    );
  }

  addSkills() {
    this.skills.push(this.newSkill());
  }

  removeSkill(i: number) {
    this.skills.removeAt(i);
  }

  resetPage() {
    this.page = 0;
    // here reset of the form
  }

  onSubmit() {
    const test = this.skills.value;
    this.convertNumbers(test);
    this.checkIfValueIsGreater();
  }

  finalArr: Array<string> = [];
  toHoursAndMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    this.finalArr.push(
      `${this.padToTwoDigits(hours)}:${this.padToTwoDigits(minutes)}`
    );
  }
  padToTwoDigits(num: number) {
    return num.toString().padStart(2, '0');
  }

  checkIfValueIsGreater() {
    this.minutesArray.sort(function (a, b) {
      return a - b;
    });
    for (let i = 0; i < this.minutesArray.length; i++) {
      if (this.minutesArray[i] - this.minutesArray[i - 1] < 120) {
        return;
      }
      this.toHoursAndMinutes(this.minutesArray[i]);
    }
  }

  minutesArray: Array<number> = [];

  convertNumbers(test: Array<ExpInterface>) {
    this.finalArr = [];
    this.minutesArray = [];
    // 480 and 1380
    test.map((bruh: ExpInterface) => {
      const timeParts = bruh.exp.split(':');
      this.minutesArray.push(Number(timeParts[0]) * 60 + Number(timeParts[1]));
    });
  }

  fetchFilms() {
    this.filmService.getFilms().subscribe((test) => {
      this.allFilms$$.next(test);
    });
  }
}
