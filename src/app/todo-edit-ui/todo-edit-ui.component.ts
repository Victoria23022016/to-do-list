import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Todo } from '../models/models';

@Component({
  selector: 'app-todo-edit-ui',
  templateUrl: './todo-edit-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoEditUiComponent implements OnInit {
  @Input() todo: Todo;
  @Input() hiddenInput: boolean;
  @Output() editTodo = new EventEmitter<string>();

  text = '';

  ngOnInit(): void {
    this.text = this.todo.todo;
  }

  onEdit(): void {
    if (this.text) {
      this.editTodo.emit(this.text);
    }
  }
}
