import { NgModule, } from '@angular/core';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const ChilRoute: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children:[
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo:'404'}
    ]
}
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ChilRoute)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
