import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicStopListItemComponent } from './public-stop-list-item.component';

describe('PublicStopListItemComponent', () => {
  let component: PublicStopListItemComponent;
  let fixture: ComponentFixture<PublicStopListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PublicStopListItemComponent],
    });
    fixture = TestBed.createComponent(PublicStopListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
