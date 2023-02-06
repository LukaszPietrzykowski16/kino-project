import { TestBed } from '@angular/core/testing';

import { ChangeDayService } from './change-day.service';

describe('ChangeDayService', () => {
  let service: ChangeDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
