import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, pluck } from 'rxjs';
import { Stop } from 'src/app/data-model/stop';

@Injectable({
  providedIn: 'root',
})
export class StopsService {
  apiUrl = 'https://start.vag.de/dm/api/v1';

  constructor(private http: HttpClient) {}

  getByName(name: string): Observable<Stop[]> {
    const netvu = 'vgn';

    return this.http
      .get<Stop[]>(`${this.apiUrl}/haltestellen.json/${netvu}?name=${name}`)
      .pipe(
        map((res: any) => res['Haltestellen']),
        catchError((err) => {
          console.error(err);
          return of([]);
        })
      );
  }
}
