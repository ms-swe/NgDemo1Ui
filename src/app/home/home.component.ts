import { Component } from '@angular/core';
import {
  Observable,
  concatMap,
  exhaustMap,
  from,
  interval,
  map,
  mergeAll,
  mergeMap,
  switchMap,
  take,
  takeUntil,
  timer,
} from 'rxjs';

@Component({
  selector: 'nd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent {
  prefix(base: number) {
    return Date.now() - base + ' ';
  }

  starteSpielplatz() {
    const t0 = Date.now();

    console.log(
      this.prefix(t0) +
        '----------------------------------------------------------'
    );

    const a$ = interval(1000);

    a$.pipe(
      take(5),
      map((val) => this.doWork('outer' + val)),
      mergeAll()
      //mergeMap((val) => this.doWork('outer' + val))     statt map + mergeAll; startet das innere Observable (doWork) sofort für jeden äußeren Wert und gibt die Ergebnisse sofort weiter
      //concatMap((val) => this.doWork('outer' + val))    startet das nächste innere Observable erst, wenn das vorherige completed ist
      //switchMap((val) => this.doWork('outer' + val))    beendet die innere Subscription, sobald außen ein neuer Wert eintrifft; noch außstehende Werte von doWork() gehen verloren
      //exhaustMap((val) => this.doWork('outer' + val))     verwirft neue Werte von außen, solange das innere Observable noch nicht completed ist
    ).subscribe((v) => {
      console.log(this.prefix(t0) + 'final-' + v);
    });
  }

  doWork(name: string): Observable<string> {
    console.log('doWork(' + name + ')');
    return interval(300).pipe(
      take(5),
      map((val) => name + '-' + val)
    );
  }
}
