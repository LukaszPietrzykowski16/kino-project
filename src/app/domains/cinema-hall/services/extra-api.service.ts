import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/home/services/api-service.service';

@Injectable({
  providedIn: 'root',
})
export class ExtraApiService {
  private apiService = inject(ApiServiceService);
  private router = inject(Router);

  private newUrl = '';

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
}
