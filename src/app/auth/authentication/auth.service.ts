import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { userActions } from '../store/user.action';
import { LoginData } from './auth.interface';
import { AppState } from 'src/app/app.module';
import { TokenService } from 'src/app/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private store = inject<Store<AppState>>(Store);
  private router = inject(Router);
  private tokenService = inject(TokenService);

  private url = 'http://localhost:3000/login';

  private auth$$ = new BehaviorSubject<{ hasAuth: boolean }>({
    hasAuth: false,
  });

  get isAuth$() {
    return this.auth$$.asObservable();
  }

  constructor() {
    this.initAuth();
  }

  get auth$() {
    return this.auth$$.asObservable();
  }

  private initAuth() {
    if (this.tokenService.token && !this.tokenService.isTokenExpired()) {
      this.auth$$.next({ hasAuth: true });
    }
  }
  user$ = this.store.select('User');

  logIn(email: string, password: string) {
    return this.http
      .post<LoginData>(this.url, {
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
            this.store.dispatch(
              userActions.changeRole({
                role: user.type,
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
              })
            );
            this.router.navigate(['/']);
          },
        })
      )
      .subscribe();
  }

  logOut() {
    this.auth$$.next({ hasAuth: false });
    this.store.dispatch(
      userActions.changeRole({
        role: 'visitor',
        id: NaN,
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: NaN,
      })
    );
    this.router.navigate(['/']);
  }
}
