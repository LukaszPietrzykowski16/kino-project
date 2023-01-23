import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPanelComponent } from './forms-panel.component';

describe('FormsPanelComponent', () => {
  let component: FormsPanelComponent;
  let fixture: ComponentFixture<FormsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
