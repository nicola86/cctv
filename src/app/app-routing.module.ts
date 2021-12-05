import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'index', loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule) },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
