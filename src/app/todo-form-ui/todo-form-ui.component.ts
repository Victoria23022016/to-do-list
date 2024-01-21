import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoValidators } from './todo-form.validators';

@Component({
  selector: 'app-todo-form-ui',
  templateUrl: './todo-form-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormUiComponent implements OnInit {
  @Output() createTodo = new EventEmitter<string>();

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      todo: new FormControl('', [Validators.required, TodoValidators.minValue]), //сделать доп.валидатор
    });
  }

  onSubmit(): void {
    this.createTodo.emit(this.form.value.todo);
    this.form.reset();
  }
}
