import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WantWatchFilmComponent } from './want-watch-film.component';

describe('WantWatchFilmComponent', () => {
  let component: WantWatchFilmComponent;
  let fixture: ComponentFixture<WantWatchFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WantWatchFilmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WantWatchFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
