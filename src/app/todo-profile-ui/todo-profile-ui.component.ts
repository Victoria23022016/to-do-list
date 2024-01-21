import { Component, Input } from '@angular/core';
import { User } from '../models/models';

@Component({
  selector: 'app-todo-profile-ui',
  templateUrl: './todo-profile-ui.component.html',
})
export class TodoProfileUiComponent {
  @Input() user: User;
}
