import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const childRoute: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      // '' indica que tomará la ruta por defecto al 'dashboard'
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'}},
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Cuenta'} }, 
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRoute)
  ],
  exports:[
    RouterModule
  ]
})
export class PagesRoutingModule { }
