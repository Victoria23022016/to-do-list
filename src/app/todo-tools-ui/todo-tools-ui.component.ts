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

  sortedListById = false;
  sortedListByCompleted = false;

  onSortId(): void {
    this.sortedListById = !this.sortedListById;
    this.sortId.emit(this.sortedListById);
  }

  onSortCompleted(): void {
    this.sortedListByCompleted = !this.sortedListByCompleted;
    this.sortCompleted.emit(this.sortedListByCompleted);
  }
}
