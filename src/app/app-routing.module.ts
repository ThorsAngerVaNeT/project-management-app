import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './ng-zorro-pages/boards/boards.component';
import { ConfirmationComponent } from './ng-zorro-pages/confirmation/confirmation.component';
import { CreateBoardComponent } from './ng-zorro-pages/create-board/create-board.component';
import { CreateTaskComponent } from './ng-zorro-pages/create-task/create-task.component';
import { MainComponent } from './ng-zorro-pages/main/main.component';
import { SignInComponent } from './ng-zorro-pages/signin/signin.component';
import { SignupComponent } from './ng-zorro-pages/signup/signup.component';
import { WelcomeComponent } from './ng-zorro-pages/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'boards', component: BoardsComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'create-board', component: CreateBoardComponent },
  { path: 'create-task', component: CreateTaskComponent },
  { path: 'confirmation', component: ConfirmationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
