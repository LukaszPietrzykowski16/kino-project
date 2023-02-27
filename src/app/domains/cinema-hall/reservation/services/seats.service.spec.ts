import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { map } from 'rxjs';
import { SeatsService } from './seats.service';

const exactSeat = {
  avaliable: false,
  id: 32,
  isChoosen: true,
  reservation: false,
  seat: 'C10',
};

describe('SeatsService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SeatsService],
      imports: [HttpClientTestingModule],
    });
  });

  it('get seats from API', (done) => {
    // arrange
    const expectedUrl = 'http://localhost:3000/reservation';
    const service = TestBed.inject(EnvironmentInjector).get(SeatsService);
    const httpController = TestBed.inject(HttpTestingController);

    // act
    service.getSeats().subscribe({
      next: (res) => {
        expect(res).toEqual({});
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual('Error');
        done();
      },
    });

    // assert
    const req = httpController.expectOne(expectedUrl);
    req.flush({});
  });

  it('creating seats', (done) => {
    // arrange
    const service = TestBed.inject(EnvironmentInjector).get(SeatsService);

    // act
    service.createSeats();

    // assert
    service.seats$.subscribe((state) => {
      expect(state).toEqual([]);
      done();
    });
  });

  it('update color', (done) => {
    // arrange
    const service = TestBed.inject(EnvironmentInjector).get(SeatsService);

    // act
    service.createSeats();
    service.updateColor(exactSeat);
    // assert
    service.seats$.subscribe((result) => {
      expect(result).toEqual([]);
      done();
    });
  });
});
