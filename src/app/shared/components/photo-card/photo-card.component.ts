import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPhoto } from '../../types/photo';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoCardComponent {
  @Input() photo!: IPhoto;
}
