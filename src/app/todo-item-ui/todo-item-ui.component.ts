import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Todo } from '../models/models';

@Component({
  selector: 'app-todo-item-ui',
  templateUrl: './todo-item-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemUiComponent {
  @Input() todo: Todo;
  @Output() deleteTodo = new EventEmitter<number>();
  @Output() checkTodo = new EventEmitter<number>();
  @Output() editTodo = new EventEmitter<{ id: number; text: string }>();

  hiddenInput = true;

  onDelete(id: number): void {
    this.deleteTodo.emit(id);
  }

  onCheckTodo(id: number): void {
    this.checkTodo.emit(id);
  }

  onEdit(text: string, id: number) {
    this.editTodo.emit({ text, id });
    this.hiddenInput = true;
  }

  showInput(): void {
    this.hiddenInput = false;
  }
}
