import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-todo-tools-ui',
  templateUrl: './todo-tools-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoToolsUiComponent {
  @Output() sortId = new EventEmitter();
  @Output() sortCompleted = new EventEmitter();

  onSortId(): void {
    this.sortId.emit();
  }

  onSortCompleted(): void {
    this.sortCompleted.emit();
  }
}
