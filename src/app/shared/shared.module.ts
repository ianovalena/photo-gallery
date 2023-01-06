import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PhotoCardComponent } from './components/photo-card/photo-card.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PhotoCardComponent,
    CardsListComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule
  ],
  exports: [
    MatButtonModule,
    CardsListComponent,
  ]
})
export class SharedModule {}
