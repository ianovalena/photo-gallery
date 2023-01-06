import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { IPhoto } from '../types/photo';
import { HttpClient } from '@angular/common/http';
import { getDelay } from './random-delay.helper';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  static readonly DEFAULT_SIZE = '300';
  static readonly URL = 'https://picsum.photos';
  static readonly LIST_URL = 'https://picsum.photos/v2/list';

  constructor(private http: HttpClient) {}

  getPhotos(page: number, limit: number): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>(`${PhotoService.LIST_URL}?page=${page}&limit=${limit}`)
      .pipe(
        map(photos => photos.map(({id}) => ({ id, url: PhotoService.getPhotoUrl(id) }))),
        catchError(() => of([])),
        delay(getDelay())
      )
  }

  getPhotosById(ids: number[]): Observable<IPhoto[]> {
    return of(ids.map(id => ({ id, url: PhotoService.getPhotoUrl(id) })))
      .pipe(delay(getDelay()));
  }

  getPhoto(id: number, size?: string): Observable<IPhoto> {
    const photo = {
      id,
      url: PhotoService.getPhotoUrl(id, size)
    };
    return of(photo).pipe(delay(getDelay()));
  }

  private static getPhotoUrl(id: number, size?: string): string {
    return `${PhotoService.URL}/id/${id}/${size || PhotoService.DEFAULT_SIZE}`;
  };
}
