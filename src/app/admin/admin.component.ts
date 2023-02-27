import { Component, inject } from '@angular/core';
import {
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

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  private fb = inject(FormBuilder);
  private store = inject<Store<FilmAdminState>>(Store);

  admin$ = this.store.select('AdminFilm');

  filmForm!: FormGroup;
  constructor() {}
  createForm() {
    this.filmForm = this.fb.group({
      title: ['', Validators.required],
      types: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      rating: ['', Validators.required],
      length: ['', Validators.required],
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

  addFilm() {
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
