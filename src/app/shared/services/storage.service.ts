import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setString(key: string, token: string) {
    localStorage.setItem(key, token);
  }

  getString(key: string): string | null{
    return localStorage.getItem(key);
  }
}
