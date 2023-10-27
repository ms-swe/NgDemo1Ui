import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavoriteStop } from 'src/app/data-model/favoriteStop';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteStopsService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FavoriteStop[]> {
    return this.http.get<FavoriteStop[]>(`${this.apiUrl}/favorite-stops`).pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );
  }

  upsert(favoriteStop: FavoriteStop): Observable<FavoriteStop> {
    return this.http.put<FavoriteStop>(
      `${this.apiUrl}/favorite-stop`,
      favoriteStop
    );
  }

  delete(favoriteStop: FavoriteStop): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/favorite-stop/${favoriteStop.id}`);
  }
}
