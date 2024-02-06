import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nd-test-play-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-play-popup.component.html',
  styleUrl: './test-play-popup.component.scss',
})
export class TestPlayPopupComponent {
  constructor() {
    console.log('constructor of TestPlayPopupComponent');
  }
}
