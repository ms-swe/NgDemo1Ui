import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicStopListComponent } from './public-stop-list.component';

describe('PublicStopListComponent', () => {
  let component: PublicStopListComponent;
  let fixture: ComponentFixture<PublicStopListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PublicStopListComponent],
    });
    fixture = TestBed.createComponent(PublicStopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
