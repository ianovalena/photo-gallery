import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../../../shared/services/photo.service';
import { IPhoto } from '../../../shared/types/photo';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.scss']
})
export class PhotoPageComponent implements OnInit {
  photo!: IPhoto;
  isFavorite!: boolean;
  isLoading: boolean = true;
  isUpdating: boolean = false;

  constructor(
    private favoritesService: FavoritesService,
    private photoService: PhotoService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    combineLatest([
      this.favoritesService.getFavorites(),
      this.photoService.getPhoto(Number(this.route.snapshot.params['id']), '600')
    ]).subscribe(([favorites, photo]) => {
      this.photo = photo;
      this.isFavorite = favorites.has(photo.id);
      this.isLoading = false;
    });
  }

  onFavoritesToggle() {
    this.isUpdating = true;
    const request = this.isFavorite ?
      this.favoritesService.removeFromFavorites(this.photo.id) : this.favoritesService.saveToFavorites(this.photo.id);

    request.subscribe(() => {
      this.isFavorite = !this.isFavorite;
      this.isUpdating = false;
    });
  }
}
