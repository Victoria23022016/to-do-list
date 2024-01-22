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
  @Output() changeMode = new EventEmitter();

  sortedListById = false;
  sortedListByCompleted = false;
  localStorageMode = false;

  onSortId(): void {
    this.sortedListById = !this.sortedListById;
    this.sortId.emit(this.sortedListById);
  }

  onSortCompleted(): void {
    this.sortedListByCompleted = !this.sortedListByCompleted;
    this.sortCompleted.emit(this.sortedListByCompleted);
  }

  onLocalStorageMode(): void {
    this.localStorageMode = !this.localStorageMode;
    this.changeMode.emit(true);
  }

  onServerMode(): void {
    this.localStorageMode = !this.localStorageMode;
    this.changeMode.emit(false);
  }
}
