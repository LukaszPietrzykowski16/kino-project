import { TestBed } from '@angular/core/testing';

import { ChangeHoursService } from './change-hours.service';

describe('ChangeHoursService', () => {
  let service: ChangeHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
