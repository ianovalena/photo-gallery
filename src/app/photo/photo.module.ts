import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoPageComponent } from './components/photo-page/photo-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    PhotoPageComponent
  ],
  imports: [
    CommonModule,
    PhotoRoutingModule,
    SharedModule,
    RouterModule,
    MatProgressSpinnerModule,
  ]
})
export class PhotoModule { }
