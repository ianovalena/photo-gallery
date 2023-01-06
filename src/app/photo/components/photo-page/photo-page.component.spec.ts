import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoPageComponent } from './photo-page.component';
import { of } from 'rxjs';
import { PhotoService } from '../../../shared/services/photo.service';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { ActivatedRoute } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';

describe('PhotoPageComponent', () => {
  let component: PhotoPageComponent;
  let fixture: ComponentFixture<PhotoPageComponent>;
  let getPhotoSpy: jasmine.Spy;
  let favoritesServiceMock: jasmine.SpyObj<FavoritesService>;


  beforeEach(async () => {
    const photoServiceMock = jasmine.createSpyObj('PhotoService', ['getPhoto']);
    getPhotoSpy = photoServiceMock.getPhoto.and.returnValue(of({ id: 12, url: 'test/url' }));

    favoritesServiceMock = favoritesServiceMock = jasmine.createSpyObj(
      'FavoritesService', ['getFavorites', 'removeFromFavorites', 'saveToFavorites']
    );
    favoritesServiceMock.getFavorites.and.returnValue(of(new Set([1, 3, 12, 45])));
    favoritesServiceMock.removeFromFavorites.and.returnValue(of(true));
    favoritesServiceMock.saveToFavorites.and.returnValue(of(true));

    const route = {
      snapshot: { params: { id: '12' } }
    }

    await TestBed.configureTestingModule({
      providers: [
        { provide: PhotoService, useValue: photoServiceMock },
        { provide: FavoritesService, useValue: favoritesServiceMock },
        { provide: ActivatedRoute, useValue: route },
      ],
      declarations: [ PhotoPageComponent, MockComponent(MatSpinner), MockComponent(MatButton) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init photo', () => {
    expect(component.photo).toEqual({ id: 12, url: 'test/url' });
    expect(component.isFavorite).toBeTruthy();
  });

  it('should toggle favorite with correct request', () => {
    component.onFavoritesToggle();
    expect(favoritesServiceMock.removeFromFavorites).toHaveBeenCalledWith(12);
    expect(component.isFavorite).toBeFalsy();

    component.onFavoritesToggle();
    expect(favoritesServiceMock.saveToFavorites).toHaveBeenCalledWith(12);
    expect(component.isFavorite).toBeTruthy();
  });
});
