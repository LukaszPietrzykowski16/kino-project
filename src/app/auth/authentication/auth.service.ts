import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { userActions } from '../store/user.action';
import { User } from 'src/app/app.module';
import { LoginData } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private store = inject<Store<User>>(Store);
  private router = inject(Router);
  private url = 'http://localhost:3000/login';

  user$ = this.store.select((state) => state.User.type);

  private auth$$ = new BehaviorSubject<{ hasAuth: boolean }>({
    hasAuth: false,
  });

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
            this.decideRole(user.type);
            // this.router.navigate(['/']);
            this.user$.subscribe((test) => {
              console.log(test);
            });
          },
        })
      );
  }

  decideRole(role: string) {
    if (role === 'user') {
      this.store.dispatch(userActions.changeDefaultToUser());
    }
    if (role === 'admin') {
      this.store.dispatch(userActions.changeDefaultToAdmin());
    }
  }
}
