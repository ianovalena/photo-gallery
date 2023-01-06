import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { PhotoService } from '../../../shared/services/photo.service';
import { switchMap } from 'rxjs';
import { IPhoto } from '../../../shared/types/photo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites-gallery',
  templateUrl: './favorites-gallery.component.html',
  styleUrls: ['./favorites-gallery.component.scss']
})
export class FavoritesGalleryComponent implements OnInit {
  favorites: IPhoto[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private photoService: PhotoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.favoritesService.getFavorites()
      .pipe(switchMap(favoritesId => this.photoService.getPhotosById(Array.from(favoritesId))))
      .subscribe(favorites => this.favorites = favorites);
  }

  openPhotoPage(id: number) {
    this.router.navigate(['/photos', id]);
  }
}
