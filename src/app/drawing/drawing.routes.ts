import { Routes } from '@angular/router';
import { DrawingP5Component } from './drawing-p5/drawing-p5.component';

export const DRAWING_ROUTES: Routes = [
  { path: '', redirectTo: 'drawing-p5', pathMatch: 'full' },
  {
    path: 'drawing-p5',
    component: DrawingP5Component,
  },
];
