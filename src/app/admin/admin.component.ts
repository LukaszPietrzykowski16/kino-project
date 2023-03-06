import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, pipe } from 'rxjs';
import { FilmAdminState } from './admin.module';
import { addFilmsFromApiActions } from './store/admin.action';
import { Film } from 'src/app/home/film-panel/film-panel.component';
import { trimValidator } from '../domains/form/input-vaidator.validator';
import { NotificationComponent } from '../home/film-panel/notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  private fb = inject(FormBuilder);
  private store = inject<Store<FilmAdminState>>(Store);
  private snackBar = inject(MatSnackBar);

  admin$ = this.store.select('AdminFilm');

  filmForm!: FormGroup;
  durationInSeconds = 3;

  createForm() {
    this.filmForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(50),
          trimValidator,
        ],
      ],
      types: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(20),
          trimValidator,
        ],
      ],
      image: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(200),
          trimValidator,
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(200),
          trimValidator,
        ],
      ],
      rating: ['', [Validators.required, Validators.maxLength(2)]],
      length: ['', [Validators.required]],
    });
  }

  get titleCtrl() {
    return this.filmForm.controls.title;
  }

  get lengthCtrl() {
    return this.filmForm.controls.length;
  }

  get typesCtrl() {
    return this.filmForm.controls.types;
  }

  get imageCtrl() {
    return this.filmForm.controls.image;
  }

  get descriptionCtrl() {
    return this.filmForm.controls.description;
  }

  get ratingCtrl() {
    return this.filmForm.controls.rating;
  }

  openSnackBar(titleValue: string) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: titleValue,
      duration: this.durationInSeconds * 1000,
    });
  }

  addFilm() {
    this.openSnackBar('Dodano film do bazy danych!');
    const filmsNew: Film = {
      id: NaN,
      title: this.titleCtrl.value,
      types: this.typesCtrl.value,
      image: this.imageCtrl.value,
      description: this.descriptionCtrl.value,
      rating: this.ratingCtrl.value,
      length: this.lengthCtrl.value,
    };

    this.store.dispatch(
      addFilmsFromApiActions.addSingleFilm({ films: filmsNew })
    );
  }

  ngOnInit() {
    this.store.dispatch(addFilmsFromApiActions.getFilms());
    this.createForm();
  }
}
