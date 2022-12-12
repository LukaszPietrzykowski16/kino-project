import { TestBed } from '@angular/core/testing';

import { ExtraApiService } from './extra-api.service';

describe('ExtraApiService', () => {
  let service: ExtraApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
