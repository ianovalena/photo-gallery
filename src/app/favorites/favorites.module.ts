import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesGalleryComponent } from './components/favorites-gallery/favorites-gallery.component';


@NgModule({
  declarations: [
    FavoritesGalleryComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
