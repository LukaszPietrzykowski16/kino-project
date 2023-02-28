import { TestBed } from '@angular/core/testing';

import { ExactScreeningService } from './exact-screening.service';

describe('ExactScreeningService', () => {
  let service: ExactScreeningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExactScreeningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
