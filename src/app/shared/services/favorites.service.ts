import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { StorageService } from './storage.service';
import { getDelay } from './random-delay.helper';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  static readonly KEY = 'favorites';
  favorites: Set<number>;

  constructor(private storage: StorageService) {
    const stringFavorites = storage.getString(FavoritesService.KEY);
    if (stringFavorites) {
      this.favorites = new Set(stringFavorites.split(',').map(f => Number(f)));
    } else {
      this.favorites = new Set();
    }
  }

  getFavorites(): Observable<Set<number>> {
    return of(this.favorites).pipe(delay(getDelay()));
  }

  saveToFavorites(id: number): Observable<boolean> {
    if (!this.favorites.has(id)) {
      this.favorites.add(id);
      this.updateStorage();
      return of(true).pipe(delay(getDelay()));
    }
    return of(false).pipe(delay(getDelay()));
  }

  removeFromFavorites(id: number): Observable<boolean> {
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
      this.updateStorage();
      return of(true).pipe(delay(getDelay()));
    }
    return of(false).pipe(delay(getDelay()));
  }

  private updateStorage() {
    this.storage.setString(FavoritesService.KEY, Array.from(this.favorites).toString());
  }
}
