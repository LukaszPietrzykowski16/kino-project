import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlikCode } from '../forms-panel/forms-panel.component';

@Injectable({
  providedIn: 'root',
})
export class BlikService {
  private url: string = `http://localhost:3000/blik`;

  constructor(private http: HttpClient) {}

  getBlik() {
    return this.http.get<BlikCode>(this.url);
  }
}
