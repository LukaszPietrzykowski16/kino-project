import { TestBed } from '@angular/core/testing';

import { SendTicketsService } from './send-tickets.service';

describe('SendTicketsService', () => {
  let service: SendTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
