import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPhoto } from '../../types/photo';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsListComponent {
  @Input() photos!: IPhoto[];

  trackById(index: number, photo: IPhoto) {
    return photo.id;
  }
}
