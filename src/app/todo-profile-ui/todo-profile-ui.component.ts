import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../models/models';

@Component({
  selector: 'app-todo-profile-ui',
  templateUrl: './todo-profile-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoProfileUiComponent {
  @Input() user: User;
}
