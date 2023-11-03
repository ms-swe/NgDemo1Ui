import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopListComponent } from './stop-list.component';

describe('StopListComponent', () => {
  let component: StopListComponent;
  let fixture: ComponentFixture<StopListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [StopListComponent]
});
    fixture = TestBed.createComponent(StopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
