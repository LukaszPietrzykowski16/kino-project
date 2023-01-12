import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmPanelHourComponent } from './film-panel-hour.component';

describe('FilmPanelHourComponent', () => {
  let component: FilmPanelHourComponent;
  let fixture: ComponentFixture<FilmPanelHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmPanelHourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmPanelHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
