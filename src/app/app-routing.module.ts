import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./pages/pages.routing').then(m => m.PagesRoutingModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.routing').then(m => m.AuthRoutingModule) },
  { path: '404', component: NotpagefoundComponent},
  { path: '**', redirectTo: '404'}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
   ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
