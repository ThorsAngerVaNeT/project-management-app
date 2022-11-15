import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmationComponent } from './shared/components/confirmation/confirmation.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./welcome/welcome.module').then((m) => m.WelcomeModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'boards', loadChildren: () => import('./boards/boards.module').then((m) => m.BoardsModule) },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then((m) => m.TasksModule) },
  { path: 'confirm', component: ConfirmationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
