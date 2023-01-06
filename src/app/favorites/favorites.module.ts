import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesGalleryComponent } from './components/favorites-gallery/favorites-gallery.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FavoritesGalleryComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule,
  ]
})
export class FavoritesModule { }
