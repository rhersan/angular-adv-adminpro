import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotpagefoundComponent } from './pages/notpagefound/notpagefound.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages-routing.module').then(m => m.PagesRoutingModule) },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
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
