import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FilmAdminState } from './admin.module';
import { addFilmsFromApiActions } from './store/admin.action';
import { trimValidator } from '../domains/form/input-vaidator.validator';
import { NotificationComponent } from '../home/film-panel/notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Film } from '../home/film-panel/film-panel.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  private fb = inject(NonNullableFormBuilder);
  private store = inject<Store<FilmAdminState>>(Store);
  private snackBar = inject(MatSnackBar);

  admin$ = this.store.select('AdminFilm');

  filmForm = this.createForm();
  durationInSeconds = 3;

  createForm() {
    return this.fb.group({
      title: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(50),
          trimValidator,
        ],
      }),
      types: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(20),
          trimValidator,
        ],
      }),
      image: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(200),
          trimValidator,
        ],
      }),
      description: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(200),
          trimValidator,
        ],
      }),
      rating: this.fb.control('', {
        validators: [Validators.required, Validators.maxLength(2)],
      }),
      length: this.fb.control('', {
        validators: [Validators.required],
      }),
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
    if (this.filmForm.valid) {
      this.openSnackBar('Dodano film do bazy danych!');
      const filmsNew: Film = {
        id: NaN,
        title: this.titleCtrl.value,
        types: this.typesCtrl.value,
        image: this.imageCtrl.value,
        description: this.descriptionCtrl.value,
        rating: Number(this.ratingCtrl.value),
        length: Number(this.lengthCtrl.value),
      };
      this.store.dispatch(
        addFilmsFromApiActions.addSingleFilm({ films: filmsNew })
      );
      this.filmForm.reset();
    } else {
      this.openSnackBar('Wprowadź właściwe dane!');
    }
  }

  ngOnInit() {
    this.store.dispatch(addFilmsFromApiActions.getFilms());
  }
}
