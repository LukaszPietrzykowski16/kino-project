import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmPanelComponent } from './film-panel.component';

describe('FilmPanelComponent', () => {
  let component: FilmPanelComponent;
  let fixture: ComponentFixture<FilmPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
