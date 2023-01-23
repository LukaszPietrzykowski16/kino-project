import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlikCode } from './domains/form/forms-panel/forms-panel.component';

@Injectable({
  providedIn: 'root',
})
export class BlikService {
  url: string = `http://localhost:3000/blik`;

  constructor(private http: HttpClient) {}

  getBlik() {
    return this.http.get<BlikCode>(this.url);
  }
}
