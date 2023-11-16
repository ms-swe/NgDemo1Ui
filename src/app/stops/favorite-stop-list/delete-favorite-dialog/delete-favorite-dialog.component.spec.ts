import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFavoriteDialogComponent } from './delete-favorite-dialog.component';

describe('DeleteFavoriteDialogComponent', () => {
  let component: DeleteFavoriteDialogComponent;
  let fixture: ComponentFixture<DeleteFavoriteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeleteFavoriteDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteFavoriteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
