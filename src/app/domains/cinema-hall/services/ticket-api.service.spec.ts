import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector } from '@angular/core';
import TicketApiService from './ticket-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('TicketApiService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [TicketApiService],
      imports: [HttpClientTestingModule],
    });
  });

  it('get ticket object', (done) => {
    // arrange
    const expectedUrl = 'http://localhost:3000/ticket-types';
    const service = TestBed.inject(EnvironmentInjector).get(TicketApiService);
    const httpController = TestBed.inject(HttpTestingController);

    // act
    service.getTickets().subscribe({
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
});
