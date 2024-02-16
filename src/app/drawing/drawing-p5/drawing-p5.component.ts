import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as p5 from 'p5';
import { MyCircle } from '../MyCircle';

const sketch = (p: p5) => {
  p.preload = () => {};

  p.setup = () => {
    p.createCanvas(1600, 900);
    p.background(0);

    p.stroke('lightblue');
    p.line(0, 0, 200, 200);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  let x = 0;

  p.draw = () => {
    p.frameRate(24);

    if (x < 1000) {
      p.ellipse(x, p.height / 2, 20, 40);
      x = x + 40;
    } else {
      let circlePos = p.createVector(100, 100);
      let c = new MyCircle(p, circlePos, 200);
      c.draw();
    }
  };
};

@Component({
  selector: 'nd-drawing-p5',
  standalone: true,
  //changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './drawing-p5.component.html',
  styleUrl: './drawing-p5.component.css',
})
export class DrawingP5Component implements OnInit {
  p5!: p5;
  @ViewChild('sketch') sketch!: ElementRef;

  ngZone = inject(NgZone);

  ngOnInit() {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.p5 = new p5(sketch, this.sketch.nativeElement);
    });
  }

  now(): Date {
    return new Date();
  }
}
