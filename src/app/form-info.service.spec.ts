import { TestBed } from '@angular/core/testing';

import { FormInfoService } from './form-info.service';

describe('FormInfoService', () => {
  let service: FormInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
