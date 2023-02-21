import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  private fb = inject(FormBuilder);

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

  ngOnInit() {
    this.createForm();
  }
}
