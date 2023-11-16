import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'nd-delete-favorite-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-favorite-dialog.component.html',
  styleUrls: ['./delete-favorite-dialog.component.scss'],
})
export class DeleteFavoriteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { haltestellenname: string }
  ) {}
}
