import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PhotoService } from './photo.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('PhotoService', () => {
  let service: PhotoService;
  let getSpy: jasmine.Spy;

  beforeEach(() => {
    const httpClientMock = jasmine.createSpyObj('HttpClient', ['get']);
    getSpy = httpClientMock.get;

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientMock }]
    });
    service = TestBed.inject(PhotoService);
  });

  it('should return list of photos with custom urls', fakeAsync(() => {
    getSpy.and.returnValue(of([{ id: 1, url: 'photo/1'}, { id: 2, url: 'photo/2'}]));
    service.getPhotos(1, 2).subscribe(result => {
      expect(result).toEqual([
        { id: 1, url: 'https://picsum.photos/id/1/300'},
        { id: 2, url: 'https://picsum.photos/id/2/300'}
      ]);
    });
    tick(600);
  }));

  it('should call list api with limit and page', fakeAsync(() => {
    getSpy.and.returnValue(of([]));
    service.getPhotos(3, 10).subscribe();
    tick(600);
    expect(getSpy).toHaveBeenCalledOnceWith('https://picsum.photos/v2/list?page=3&limit=10');
  }));

  it('should return empty array on error', fakeAsync(() => {
    getSpy.and.returnValue(throwError('ooops'));
    service.getPhotos(3, 10).subscribe(result => {
      expect(result.length).toBe(0);
    });
    tick(600);
  }));

  it('should return photo with default size', fakeAsync(() => {
    service.getPhoto(1).subscribe(result => {
      expect(result.url.includes(PhotoService.DEFAULT_SIZE)).toBeTruthy();
    });
    tick(300);
  }));

  it('should return photo with custom size', fakeAsync(() => {
    service.getPhoto(3, '700').subscribe(result => {
      expect(result.url.includes(PhotoService.DEFAULT_SIZE)).toBeFalsy();
      expect(result.url.includes('700')).toBeTruthy();
    });
    tick(300);
  }));
});
