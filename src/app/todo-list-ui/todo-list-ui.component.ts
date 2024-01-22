import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Todo } from '../models/models';

@Component({
  selector: 'app-todo-list-ui',
  templateUrl: './todo-list-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListUiComponent {
  @Input() todoList: Todo[] = [];
  @Output() deleteTodo = new EventEmitter<number>();
  @Output() checkTodo = new EventEmitter<number>();
  @Output() editTodo = new EventEmitter<{ id: number; text: string }>();

  onDeleteTodo(id: number): void {
    this.deleteTodo.emit(id);
  }

  onCheckTodo(id: number): void {
    this.checkTodo.emit(id);
  }

  onEditTodo(event: { id: number; text: string }): void {
    this.editTodo.emit(event);
  }
}
