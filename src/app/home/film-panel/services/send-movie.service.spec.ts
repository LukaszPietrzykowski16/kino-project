import { TestBed } from '@angular/core/testing';

import { SendMovieService } from './send-movie.service';

describe('SendMovieService', () => {
  let service: SendMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
