import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PublicStop } from 'src/app/data-model/publicStop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'nd-public-stop-list-item',
  templateUrl: './public-stop-list-item.component.html',
  styleUrls: ['./public-stop-list-item.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
  ],
})
export class PublicStopListItemComponent {
  @Input() haltestellenname = '';
  @Input() longitude = 0;
  @Input() latitude = 0;
  @Input() produkte = '';
  @Input() isFavorite: boolean = false;
  @Input() isFavoriteChangeable: boolean = false;

  @Output() favoriteChanged = new EventEmitter<boolean>();

  constructor() {
    this.isFavorite = false;
  }

  changeFavorite(event: MatSlideToggleChange) {
    this.favoriteChanged.emit(event.checked);
  }
}
