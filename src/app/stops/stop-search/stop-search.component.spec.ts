import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopSearchComponent } from './stop-search.component';

describe('StopSearchComponent', () => {
  let component: StopSearchComponent;
  let fixture: ComponentFixture<StopSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [StopSearchComponent]
});
    fixture = TestBed.createComponent(StopSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
