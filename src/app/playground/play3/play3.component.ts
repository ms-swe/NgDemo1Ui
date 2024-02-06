import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'nd-play3',
  standalone: true,
  imports: [CommonModule, MatIconModule, HttpClientModule],
  templateUrl: './play3.component.html',
  styleUrl: './play3.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Play3Component {
  // private apiUrl =
  //   'https://start.vag.de/dm/api/v1/haltestellen.json/vgn?name=Max';
  private apiUrl =
    'https://cdn2.atudo.net/api/4.0/pois.php?type=101,102,103,104,105,106,107,108,109,110,111,112,113,115,114,ts,0,1,2,3,4,5,6&z=14&box=49.446979,11.044264,49.48742,11.112155999999999';

  // auch: https://cdn2.atudo.net/api/1.0/vl.php?type=0,1,2,3,4,5,6&box=53.527656,10.024888,53.520012,10.048231

  constructor(private http: HttpClient) {}

  getFromForeignApi() {
    let obs = this.http.get<any>(`${this.apiUrl}`).pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );

    obs.subscribe((res) => console.log(res));

    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            console.log(
              'Latitude: ' +
                position.coords.latitude +
                'Longitude: ' +
                position.coords.longitude
            );
          }
        },
        (error) => console.log(error)
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
