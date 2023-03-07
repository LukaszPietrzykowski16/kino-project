import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { UserTicket } from 'src/app/domains/user-tickets/user-ticket.interface';
import { userActions } from '../store/user.action';

@Injectable({
  providedIn: 'root',
})
export class CheckUserService {
  private http = inject(HttpClient);
  private store = inject<Store<AppState>>(Store);

  checkUser(id: string | undefined) {
    this.fetchUser(id).subscribe((result) => {
      this.store.dispatch(
        userActions.changeRole({
          role: result.type,
          id: Number(result.id),
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          phoneNumber: result.phoneNumber,
        })
      );
    });
  }

  fetchUser(id: string | undefined) {
    return this.http.get<UserTicket>(`http://localhost:3000/users/${id}`);
  }
}
