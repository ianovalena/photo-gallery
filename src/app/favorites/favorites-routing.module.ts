import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesGalleryComponent } from './components/favorites-gallery/favorites-gallery.component';

const routes: Routes = [{
  path: '',
  component: FavoritesGalleryComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
