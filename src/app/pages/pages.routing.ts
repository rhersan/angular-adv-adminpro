import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

// Dashboard
import { PagesComponent } from './pages.component';




const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    canLoad:[AuthGuard],
    loadChildren: () => import('./child-rotues.module').then(m => m.ChildRotuesModule)
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }
