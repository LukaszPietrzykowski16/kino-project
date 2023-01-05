import { TestBed } from '@angular/core/testing';

import { SumUpService } from './sum-up.service';

describe('SumUpService', () => {
  let service: SumUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SumUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
