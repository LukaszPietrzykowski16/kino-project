import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, pipe } from 'rxjs';
import { AdminState } from './admin.module';
import { addFilmsFromApiActions } from './store/admin.action';
import { Film } from 'src/app/home/film-panel/film-panel.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  private fb = inject(FormBuilder);
  private store = inject<Store<AdminState>>(Store);

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
    });
  }

  get titleCtrl() {
    return this.filmForm.controls.title;
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
      id: 124,
      title: this.titleCtrl.value,
      types: this.typesCtrl.value,
      image: this.imageCtrl.value,
      description: this.descriptionCtrl.value,
      rating: this.ratingCtrl.value,
    };

    this.store.dispatch(
      addFilmsFromApiActions.addSingleFilm({ films: filmsNew })
    );
    this.admin$.subscribe((test) => {
      console.log(test);
    });
  }

  ngOnInit() {
    this.store.dispatch(addFilmsFromApiActions.getFilms());
    this.createForm();
  }
}
