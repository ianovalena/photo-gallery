import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { MainGalleryComponent } from './components/main-gallery/main-gallery.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    MainGalleryComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
  ]
})
export class GalleryModule { }
