import { TestBed } from '@angular/core/testing';

import { BlikService } from './blik.service';

describe('BlikService', () => {
  let service: BlikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
