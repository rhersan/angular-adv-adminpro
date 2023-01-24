import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';

const childRoute: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      // '' indica que tomará la ruta por defecto al 'dashboard'
      { path: '', component: DashboardComponent},
      { path: 'progress', component: ProgressComponent},
      { path: 'grafica1', component: Grafica1Component},
      { path: ' ', redirectTo: '/dashboard', pathMatch: 'full'},
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