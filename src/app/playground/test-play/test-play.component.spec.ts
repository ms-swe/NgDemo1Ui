import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPlayComponent } from './test-play.component';

describe('TestPlayComponent', () => {
  let component: TestPlayComponent;
  let fixture: ComponentFixture<TestPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should do...', async () => {
    component.showPopup();
  });
});
