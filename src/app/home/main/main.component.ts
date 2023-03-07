import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  private store = inject<Store<AppState>>(Store);
  private router = inject(Router);

  user$ = this.store.select('User');

  ngOnInit() {
    this.user$.subscribe((test) => {
      if (test.type === 'admin') {
        this.router.navigate(['/admin']);
      }
    });
  }
}
