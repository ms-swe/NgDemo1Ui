import { formatNumber } from '@angular/common';
import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { getLocale } from 'src/main';

@Directive({
  selector: '[ndLonLatExt]',
  standalone: true,
})
export class LonLatExtDirective implements OnInit {
  @Input() ndLonLatExt: number[] = [0, 0];
  @HostBinding() innerHtml = '';

  constructor() {}

  ngOnInit(): void {
    const locale = getLocale();
    const lon = formatNumber(this.ndLonLatExt[0], locale, '1.3-3');
    const lat = formatNumber(this.ndLonLatExt[1], locale, '1.3-3');
    this.innerHtml =
      "<img src='../../../assets/stops/longitude.svg' />" +
      $localize`:@@LonLatDirectiveLon:Longitude: ${lon}` +
      '° / ' +
      "<img src='../../../assets/stops/latitude.svg' />" +
      $localize`:@@LonLatDirectiveLat:Latitude: ${lat}` +
      '°';
  }
}
