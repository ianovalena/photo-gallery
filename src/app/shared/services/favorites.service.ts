import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { StorageService } from './storage.service';

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
    return of(this.favorites).pipe(delay(300));
  }

  saveToFavorites(id: number): Observable<boolean> {
    if (!this.favorites.has(id)) {
      this.favorites.add(id);
      this.updateStorage();
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  removeFromFavorites(id: number): Observable<boolean> {
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
      this.updateStorage();
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  private updateStorage() {
    this.storage.setString(FavoritesService.KEY, Array.from(this.favorites).toString());
  }
}
