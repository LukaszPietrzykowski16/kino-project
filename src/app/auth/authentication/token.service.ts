import { inject, Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { CheckUserService } from './check-user.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private checkUser = inject(CheckUserService);
  private _token: string | null = localStorage.getItem('token');
  private _decodedToken: JwtPayload | null;

  get token() {
    return this._token;
  }

  get decodedToken() {
    return this._decodedToken;
  }

  constructor() {
    this.getUser();
    this._decodedToken = this.decodeToken();
  }

  private getUser() {
    if (this.token) {
      this.checkUser.checkUser(jwtDecode<JwtPayload>(this.token).sub);
    }
  }

  private decodeToken() {
    if (this.token) {
      return jwtDecode<JwtPayload>(this.token);
    } else {
      return null;
    }
  }

  isTokenExpired(): boolean | void {
    const expTime = this.decodedToken?.exp;
    if (expTime) {
      const milisecondsInSeconds = 1000;
      const expDate = new Date(expTime * milisecondsInSeconds);
      return expDate.getTime() - Date.now() < 0;
    }
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
