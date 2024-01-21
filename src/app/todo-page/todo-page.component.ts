import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent {}
