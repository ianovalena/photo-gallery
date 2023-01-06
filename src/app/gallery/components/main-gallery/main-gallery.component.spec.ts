import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGalleryComponent } from './main-gallery.component';
import { MockComponent } from 'ng-mocks';
import { CardsListComponent } from '../../../shared/components/cards-list/cards-list.component';
import { IPhoto } from '../../../shared/types/photo';
import { of } from 'rxjs';
import { PhotoService } from '../../../shared/services/photo.service';

const mockPhotos: IPhoto[] = [
  { id: 1, url: 'id/1' },
  { id: 2, url: 'id/2' },
];

describe('MainGalleryComponent', () => {
  let component: MainGalleryComponent;
  let fixture: ComponentFixture<MainGalleryComponent>;
  let getPhotosSpy: jasmine.Spy;

  beforeEach(async () => {
    const photoServiceMock = jasmine.createSpyObj('PhotoService', ['getPhotos']);
    getPhotosSpy = photoServiceMock.getPhotos.and.returnValue(of(mockPhotos));

    await TestBed.configureTestingModule({
      declarations: [ MainGalleryComponent, MockComponent(CardsListComponent) ],
      providers: [
        { provide: PhotoService, useValue: photoServiceMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainGalleryComponent);
    component = fixture.componentInstance;
  });

  it('should increase page on photo loading', () => {
    expect(component.page).toBe(1);
    fixture.detectChanges();
    expect(component.page).toBe(2);
  });

  it('should make request with current page and limit', () => {
    fixture.detectChanges();
    expect(getPhotosSpy).toHaveBeenCalledOnceWith(1, 12);
  });
});
