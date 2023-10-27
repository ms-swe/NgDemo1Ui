import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Stop } from 'src/app/data-model/stop';

@Injectable({
  providedIn: 'root',
})
export class StopsService {
  private apiUrl = 'https://start.vag.de/dm/api/v1';
  private netvu = 'vgn';

  constructor(private http: HttpClient) {}

  getByName(name: string): Observable<Stop[]> {
    return this.http
      .get<Stop[]>(
        `${this.apiUrl}/haltestellen.json/${this.netvu}?name=${name}`
      )
      .pipe(
        map((res: any) => res['Haltestellen']),
        catchError((err) => {
          console.error(err);
          return of([]);
        })
      );
  }

  getByLocation(lon: string, lat: string, radius: string): Observable<Stop[]> {
    return this.http
      .get<Stop[]>(
        `${this.apiUrl}/haltestellen.json/${this.netvu}/location?lon=${lon}&lat=${lat}&radius=${radius}`
      )
      .pipe(
        map((res: any) => res['Haltestellen']),
        catchError((err) => {
          console.error(err);
          return of([]);
        })
      );
  }
}
