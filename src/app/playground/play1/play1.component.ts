import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSplitModule } from 'angular-split';
import { Play2SmallComponent } from '../play2-small/play2-small.component';
import { interval, map, take } from 'rxjs';

@Component({
  selector: 'nd-play1',
  standalone: true,
  imports: [CommonModule, AngularSplitModule],
  templateUrl: './play1.component.html',
  styleUrl: './play1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Play1Component {
  @ViewChild('movObj1') private movObj1!: ElementRef;
  @ViewChild('movObj2') private movObj2!: ElementRef;

  @ViewChild('imgMoving') private imgMoving!: ElementRef;
  @ViewChild('imgBasis', { read: ViewContainerRef })
  imgBasis!: ViewContainerRef;

  @ViewChild('imgScalableMoving') private imgScalableMoving!: ElementRef;

  private newComponent?: ComponentRef<Play2SmallComponent>;

  xVal = 7;
  xPercent = 0;
  yPercent = 0;

  constructor(private renderer: Renderer2) {}

  manipulate() {
    // good: use renderer with transform / translateX
    this.renderer.setStyle(
      this.movObj1.nativeElement,
      'transform',
      `translateX(${this.xVal}px)`
    );
    // bad: direct DOM manipulation
    // this.movObj1.nativeElement.style.transform = 'translateX(100px)';   // or rotate(30deg)

    // good: use renderer with relative position and left value
    this.renderer.setStyle(this.movObj2.nativeElement, 'position', 'relative');
    this.renderer.setStyle(
      this.movObj2.nativeElement,
      'left',
      `${this.xVal}px`
    );

    // good: move small element with absolute position to defined left/top (over element with relative position)
    this.renderer.setStyle(
      this.imgMoving.nativeElement,
      'left',
      `${this.xVal}px`
    );
    this.renderer.setStyle(
      this.imgMoving.nativeElement,
      'top',
      `${this.xVal}px`
    );

    // good: clone existing primitive html element
    const clone = this.imgMoving.nativeElement.cloneNode(true);
    this.renderer.appendChild(this.imgMoving.nativeElement.parentNode, clone);
    this.renderer.setStyle(clone, 'left', `${this.xVal}px`);

    // good: create new instance of angular component
    if (!this.newComponent) {
      this.newComponent = this.imgBasis.createComponent(Play2SmallComponent);
      this.newComponent.instance.aTextClicked.subscribe(() => {
        console.log('event from (inner) newComponent received');
      });
      this.newComponent.changeDetectorRef.detectChanges();
    }
    this.newComponent.setInput('aText', `at ${this.xVal}`);
    this.newComponent.instance.aText = `AT ${this.xVal}`; // funktioniert nur, wenn vorher setInput verwendet wurde

    this.xVal += 10;
  }

  moveOnScalableImage() {
    interval(50)
      .pipe(take(28))
      .subscribe(() => this.moveOnceOnScalableImage());
  }

  private moveOnceOnScalableImage() {
    this.renderer.setStyle(
      this.imgScalableMoving.nativeElement,
      'left',
      `calc(${this.xPercent}% - 13px)`
    );
    this.renderer.setStyle(
      this.imgScalableMoving.nativeElement,
      'top',
      `calc(${this.yPercent}% - 13px)`
    );

    const xStep = 100 / 6;
    const yStep = 100 / 3;
    if (this.xPercent < 100) {
      this.xPercent += xStep;
    } else if (this.yPercent < 100) {
      this.xPercent = 0;
      this.yPercent += yStep;
    } else {
      this.xPercent = this.yPercent = 0;
    }
  }
}
