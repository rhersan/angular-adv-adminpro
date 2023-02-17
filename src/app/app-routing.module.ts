import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./pages/pages.routing').then(m => m.PagesRoutingModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.routing').then(m => m.AuthRoutingModule) },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: NotpagefoundComponent},
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
   ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
