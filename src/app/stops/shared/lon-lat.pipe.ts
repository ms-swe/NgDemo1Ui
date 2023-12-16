import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { getLocale } from 'src/main';

@Pipe({
  name: 'lonlat',
  standalone: true,
})
export class LonLatPipe implements PipeTransform {
  transform(value: number[]): unknown {
    const locale = getLocale();
    const lon = formatNumber(value[0], locale, '1.3-3');
    const lat = formatNumber(value[1], locale, '1.3-3');
    return $localize`:@@LonLatPipeLonAndLat:Longitude: ${lon} / Latitude: ${lat}`;
  }
}
