import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { userActions } from '../store/user.action';

import { LoginData } from './auth.interface';
import { AppState } from 'src/app/app.module';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private store = inject<Store<AppState>>(Store);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000';
  private url = '/login';

  private auth$$ = new BehaviorSubject<{ hasAuth: boolean }>({
    hasAuth: false,
  });

  get isAuth$() {
    return this.auth$$.asObservable();
  }

  logIn(email: string, password: string) {
    return this.http
      .post<LoginData>(this.apiUrl + this.url, {
        email: email,
        password: password,
      })
      .pipe(
        tap({
          next: (res) => {
            const { accessToken, user } = res;
            this.auth$$.next({ hasAuth: true });
            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            this.store.dispatch(userActions.changeRole({ role: user.type }));
            this.router.navigate(['/theme']);
          },
        })
      )
      .subscribe();
  }
}
