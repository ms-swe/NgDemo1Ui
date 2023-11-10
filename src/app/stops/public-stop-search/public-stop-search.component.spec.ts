import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicStopSearchComponent } from './public-stop-search.component';

describe('PublicStopSearchComponent', () => {
  let component: PublicStopSearchComponent;
  let fixture: ComponentFixture<PublicStopSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PublicStopSearchComponent],
    });
    fixture = TestBed.createComponent(PublicStopSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
