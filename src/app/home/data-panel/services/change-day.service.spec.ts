import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ChangeDayService } from './change-day.service';

describe('ChangeDayService', () => {
  let service: ChangeDayService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ChangeDayService],
    });
  });

  it('should be created', () => {
    // arrange
    const testData = new Date();
    const service = TestBed.inject(EnvironmentInjector).get(ChangeDayService);

    // act
    const result = service.formatDate(testData);

    // assert
    expect(result).toEqual('27-02');
    // expect(result).toEqual('28-02');
  });
});
