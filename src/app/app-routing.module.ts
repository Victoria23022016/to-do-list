import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { TodoGuard } from './guards/todo.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'todo', component: TodoPageComponent, canActivate: [TodoGuard] },
  { path: '**', redirectTo: '/auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
