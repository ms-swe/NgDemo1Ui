import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPlayPopupComponent } from './test-play-popup.component';

describe('TestPlayPopupComponent', () => {
  let component: TestPlayPopupComponent;
  let fixture: ComponentFixture<TestPlayPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPlayPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestPlayPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
