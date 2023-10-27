import { FavoriteStop } from './favoriteStop';

export interface Stop {
  Haltestellenname: string;
  VAGKennung?: string;
  VGNKennung?: number;
  Longitude?: number;
  Latitude?: number;
  Produkte?: string;
  FavoriteStop?: FavoriteStop;
}
