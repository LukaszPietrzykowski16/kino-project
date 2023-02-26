import { TestBed } from '@angular/core/testing';

import { SelectedSeatGuard } from './selected-seat.guard';

describe('SelectedSeatGuard', () => {
  let guard: SelectedSeatGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SelectedSeatGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
