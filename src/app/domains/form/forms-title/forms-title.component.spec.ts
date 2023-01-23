import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsTitleComponent } from './forms-title.component';

describe('FormsTitleComponent', () => {
  let component: FormsTitleComponent;
  let fixture: ComponentFixture<FormsTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
