import { FavoriteStop } from './favoriteStop';

export interface PublicStop {
  Haltestellenname: string;
  VAGKennung?: string;
  VGNKennung?: number;
  Longitude?: number;
  Latitude?: number;
  Produkte?: string;
}
