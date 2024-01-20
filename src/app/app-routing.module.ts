import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TodoPageComponent } from './todo-page/todo-page.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'todo', component: TodoPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
