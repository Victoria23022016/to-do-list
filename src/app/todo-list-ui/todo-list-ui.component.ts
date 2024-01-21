import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/models';

@Component({
  selector: 'app-todo-list-ui',
  templateUrl: './todo-list-ui.component.html',
})
export class TodoListUiComponent {
  @Input() todoList: Todo[] = [];
  @Output() deleteTodo = new EventEmitter<number>();
  @Output() checkTodo = new EventEmitter<number>();

  onDeleteTodo(id: number): void {
    this.deleteTodo.emit(id);
  }

  onCheckTodo(id: number): void {
    this.checkTodo.emit(id);
  }
}
