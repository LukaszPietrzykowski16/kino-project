import { TestBed } from '@angular/core/testing';

import { SeatPostService } from './seat-post.service';

describe('SeatPostService', () => {
  let service: SeatPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
