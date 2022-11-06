import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './ng-zorro-pages/boards/boards.component';
import { MainComponent } from './ng-zorro-pages/main/main.component';
import { SignInComponent } from './ng-zorro-pages/signin/signin.component';
import { SignupComponent } from './ng-zorro-pages/signup/signup.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'boards', component: BoardsComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
