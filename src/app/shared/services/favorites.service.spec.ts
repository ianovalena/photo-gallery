import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FavoritesService } from './favorites.service';
import { StorageService } from './storage.service';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let setStringSpy: jasmine.Spy;
  let getStringSpy: jasmine.Spy;

  beforeEach(() => {
    const storageServiceMock = jasmine.createSpyObj(StorageService, ['getString', 'setString']);
    setStringSpy = storageServiceMock.setString;
    getStringSpy = storageServiceMock.getString.and.returnValue('1,4,7,95,431')

    TestBed.configureTestingModule({
      providers: [{ provide: StorageService, useValue: storageServiceMock }]
    });
  });

  it('should initialize set', () => {
    service = TestBed.inject(FavoritesService);
    expect(service.favorites.size).toBe(5);
    expect(service.favorites.has(7)).toBeTruthy();
  });

  it('should initialize set with no value if storage empty', () => {
    getStringSpy.and.returnValue(null);
    service = TestBed.inject(FavoritesService);
    expect(service.favorites.size).toBe(0);
  });

  it('should remove value from set', fakeAsync(() => {
    service = TestBed.inject(FavoritesService);
    expect(service.favorites.has(95)).toBeTruthy();
    service.removeFromFavorites(95);
    tick(300);
    expect(service.favorites.has(95)).toBeFalsy();
  }));

  it('should add value to set', fakeAsync(() => {
    service = TestBed.inject(FavoritesService);
    expect(service.favorites.has(32)).toBeFalsy();
    service.saveToFavorites(32);
    tick(300);
    expect(service.favorites.has(32)).toBeTruthy();
  }));
});
