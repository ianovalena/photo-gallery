import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { PhotoService } from '../../../shared/services/photo.service';
import { IPhoto } from '../../../shared/types/photo';
import { Subject } from 'rxjs';
import { createScrolledDownSubscription } from './scroll-utils';

@Component({
  selector: 'app-main-gallery',
  templateUrl: './main-gallery.component.html',
  styleUrls: ['./main-gallery.component.scss']
})
export class MainGalleryComponent implements OnInit, OnDestroy {
  photos: IPhoto[] = [];
  page: number = 1;
  readonly limit = 12;
  showSpinner: boolean = false;
  notifier: Subject<boolean> = new Subject<boolean>();

  constructor(
    private photoService: PhotoService,
    private zone: NgZone,
  ) {}

  ngOnInit() {
    this.loadNewPhotos();
    this.setupScroll();
  }

  private loadNewPhotos() {
    this.showSpinner = true;
    this.photoService.getPhotos(this.page++, this.limit)
      .subscribe(photos => {
        this.photos = this.photos.concat(photos);
        this.showSpinner = false;
      });
  }

  private setupScroll() {
    this.zone.runOutsideAngular(() => {
      createScrolledDownSubscription(this.notifier)
        .subscribe(() => this.handleOnScroll());
    });
  }

  private handleOnScroll() {
    if (!this.showSpinner) {
      this.zone.run(() => this.loadNewPhotos());
    }
  }

  ngOnDestroy() {
    this.notifier.next(true);
    this.notifier.complete();
  }
}
