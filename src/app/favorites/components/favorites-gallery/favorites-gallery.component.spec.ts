import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesGalleryComponent } from './favorites-gallery.component';
import { of } from 'rxjs';
import { IPhoto } from '../../../shared/types/photo';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { PhotoService } from '../../../shared/services/photo.service';
import { Router } from '@angular/router';

const mockIds = new Set([1, 2, 3]);
const mockPhotos: IPhoto[] = [
  { id: 1, url: '/id/1' },
  { id: 2, url: '/id/2' },
  { id: 3, url: '/id/3' },
];

describe('FavoritesGalleryComponent', () => {
  let component: FavoritesGalleryComponent;
  let fixture: ComponentFixture<FavoritesGalleryComponent>;
  let getPhotosByIdSpy: jasmine.Spy;
  let getFavoritesSpy: jasmine.Spy;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    const photoServiceMock = jasmine.createSpyObj('PhotoService', ['getPhotosById']);
    getPhotosByIdSpy = photoServiceMock.getPhotosById.and.returnValue(of(mockPhotos));

    const favoritesServiceMock = jasmine.createSpyObj('FavoritesService', ['getFavorites']);
    getFavoritesSpy = favoritesServiceMock.getFavorites.and.returnValue(of(mockIds));

    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    navigateSpy = routerMock.navigate;

    await TestBed.configureTestingModule({
      declarations: [ FavoritesGalleryComponent ],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceMock },
        { provide: PhotoService, useValue: photoServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should request favoritesIds and photos with this ids', () => {
    expect(getFavoritesSpy).toHaveBeenCalled();
    expect(getPhotosByIdSpy).toHaveBeenCalledWith(Array.from(mockIds));
  });

  it('should call navigate in callback with corresponding id', () => {
    component.openPhotoPage(1);
    expect(navigateSpy).toHaveBeenCalledWith(jasmine.arrayContaining([1]));
  });
});
