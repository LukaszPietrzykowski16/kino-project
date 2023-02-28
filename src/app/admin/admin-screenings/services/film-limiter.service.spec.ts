import { TestBed } from '@angular/core/testing';

import { FilmLimiterService } from './film-limiter.service';

describe('FilmLimiterService', () => {
  let service: FilmLimiterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmLimiterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
