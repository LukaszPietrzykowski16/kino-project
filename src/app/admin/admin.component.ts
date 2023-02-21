import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AdminFilmState } from './store/admin.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  private fb = inject(FormBuilder);
  private store = inject<Store<AdminFilmState>>(Store);

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

  admin$ = this.store.select('AdminFilm');

  ngOnInit() {
    this.createForm();
  }
}
