import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { qrCode } from '../summary.component';

@Injectable({
  providedIn: 'root',
})
export class QrService {
  private url: string = `http://localhost:3000/qr`;

  constructor(private http: HttpClient) {}

  getQr() {
    return this.http.get<qrCode>(this.url);
  }
}
