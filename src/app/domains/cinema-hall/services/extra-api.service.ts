import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../../../home/film-panel/film-panel.component';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'src/app/home/services/api-service.service';

@Injectable({
  providedIn: 'root',
})
export class ExtraApiService {
  private newUrl = '';
  private apiService = inject(ApiServiceService);

  displayInfoFromUrl() {
    this.newUrl = this.router.url;
    const replacing = this.newUrl
      .replace('/rezerwacja/', '')
      .replace(/\//g, ' ')
      .replace('%2F', '-');
    const data = replacing.split(' ');
    this.apiService.getExactShow(data[0], data[1], decodeURI(data[2]));
  }

  getFilm() {
    this.displayInfoFromUrl();
  }
  constructor(private router: Router, private http: HttpClient) {}
}
