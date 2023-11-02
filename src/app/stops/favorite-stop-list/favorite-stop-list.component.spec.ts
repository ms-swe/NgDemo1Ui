import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteStopListComponent } from './favorite-stop-list.component';

describe('FavoriteStopListComponent', () => {
  let component: FavoriteStopListComponent;
  let fixture: ComponentFixture<FavoriteStopListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FavoriteStopListComponent]
    });
    fixture = TestBed.createComponent(FavoriteStopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
