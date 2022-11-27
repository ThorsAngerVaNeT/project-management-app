import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth/auth.guard';
import { RootPageGuard } from './core/guards/root-page/root-page.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'boards',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then((m) => m.WelcomeModule),
    canActivate: [RootPageGuard],
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  {
    path: 'boards',
    loadChildren: () => import('./boards/boards.module').then((m) => m.BoardsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
