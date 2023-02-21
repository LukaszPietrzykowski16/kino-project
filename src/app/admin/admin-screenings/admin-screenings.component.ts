import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AdminState } from '../admin.module';
import { adminFilmActions } from '../store/admin.action';
import { AdminFilmState } from '../store/admin.interface';

@Component({
  selector: 'app-admin-screenings',
  templateUrl: './admin-screenings.component.html',
  styleUrls: ['./admin-screenings.component.css'],
})
export class AdminScreeningsComponent {
  private fb = inject(FormBuilder);
  private store = inject<Store<AdminState>>(Store);

  admin$ = this.store.select('AdminFilm');

  screeningForm!: FormGroup;
  constructor() {}
  createForm() {
    this.screeningForm = this.fb.group({
      title: ['', Validators.required],
      types: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      rating: ['', Validators.required],
    });
  }

  get titleCtrl() {
    return this.screeningForm.controls.title;
  }

  get typesCtrl() {
    return this.screeningForm.controls.types;
  }

  get imageCtrl() {
    return this.screeningForm.controls.image;
  }

  get descriptionCtrl() {
    return this.screeningForm.controls.description;
  }

  get ratingCtrl() {
    return this.screeningForm.controls.rating;
  }

  addFilm() {
    this.store.dispatch(
      adminFilmActions.addFilm({
        title: this.titleCtrl.value,
        types: this.typesCtrl.value,
        image: this.imageCtrl.value,
        description: this.descriptionCtrl.value,
        rating: this.ratingCtrl.value,
      })
    );
    this.admin$.subscribe((test) => {
      console.log(test);
    });
  }

  ngOnInit() {
    this.createForm();
  }
}
