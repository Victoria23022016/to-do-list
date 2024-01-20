import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Store, select } from '@ngrx/store';
import { Todo, User } from '../models/models';
import { loginSelector } from '../store/login/login.selectors';
import { Observable } from 'rxjs';
import { todoSelector } from '../store/todo/todo.selectors';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
})
export class TodoWidgetComponent {
  todoList: Todo[];
  test: Observable<Todo[]>; //убрать

  constructor(
    private readonly _todoService: TodoService,
    private readonly _store$: Store
  ) {}

  ngOnInit() {
    // this._todoService.loadTodoList().subscribe(resp => resp.todos = this.todoList)
  }
}
