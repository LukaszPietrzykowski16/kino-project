import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsPriceComponent } from './tickets-price.component';

describe('TicketsPriceComponent', () => {
  let component: TicketsPriceComponent;
  let fixture: ComponentFixture<TicketsPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
