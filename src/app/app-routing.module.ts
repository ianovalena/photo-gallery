import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule),
  }, {
    path: 'favorites',
    pathMatch: 'full',
    loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule),
  }, {
    path: 'photos/:id',
    pathMatch: 'full',
    loadChildren: () => import('./photo/photo.module').then(m => m.PhotoModule),
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
