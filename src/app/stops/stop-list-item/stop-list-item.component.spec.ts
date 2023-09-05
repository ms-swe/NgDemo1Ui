import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopListItemComponent } from './stop-list-item.component';

describe('StopListItemComponent', () => {
  let component: StopListItemComponent;
  let fixture: ComponentFixture<StopListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StopListItemComponent]
    });
    fixture = TestBed.createComponent(StopListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
