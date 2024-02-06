import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TestPlayPopupComponent } from '../test-play-popup/test-play-popup.component';

@Component({
  selector: 'nd-test-play',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './test-play.component.html',
  styleUrl: './test-play.component.scss',
})
export class TestPlayComponent {
  constructor(private dialog: MatDialog) {}

  showPopup() {
    console.log('opening popup...');

    const dialogRef = this.dialog.open(TestPlayPopupComponent, {});

    console.log('...popup opened');

    dialogRef.afterClosed().subscribe((result) => {
      console.log('popup closed, result=' + result);
    });
  }
}
