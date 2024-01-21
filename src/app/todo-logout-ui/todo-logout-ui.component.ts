import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-todo-logout-ui',
  templateUrl: './todo-logout-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoLogoutUiComponent {
  @Output() logout = new EventEmitter();

  onLogout(): void {
    this.logout.emit();
  }
}
