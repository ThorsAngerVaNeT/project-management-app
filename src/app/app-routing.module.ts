import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { BoardAddComponent } from './boards/components/board-add/board-add.component';
import { BoardComponent } from './boards/components/board/board.component';
import { MainPageComponent } from './boards/components/main-page/main-page.component';
import { ConfirmationComponent } from './shared/components/confirmation/confirmation.component';
import { TaskAddComponent } from './tasks/components/task-add/task-add.component';
import { WelcomeComponent } from './welcome/components/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },

  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'board-add', component: BoardAddComponent },
  { path: 'board', component: BoardComponent },
  { path: 'task-add', component: TaskAddComponent },
  { path: 'confirm', component: ConfirmationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
