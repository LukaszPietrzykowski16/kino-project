import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPanelComponent } from './data-panel.component';

describe('DataPanelComponent', () => {
  let component: DataPanelComponent;
  let fixture: ComponentFixture<DataPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should convert date', () => {
    expect(component).toBeTruthy();
    // arrange
    const testData = new Date();
  });
});
