import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
// Perfil
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
      // '' indica que tomará la ruta por defecto al 'dashboard'
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'}},
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Cuenta'} }, 
      { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas'} }, 
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1'} },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil'}} ,
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },

      // Matenimientos
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales'} },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos'} },
      { path: 'medico/nuevo', component: MedicoComponent, data: { titulo: 'Crear Medico'} },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Crear Medico'} },

      // Rutas de Admin
      { path: 'usuarios', canActivate:[AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios'} },
];



@NgModule({
  imports: [ RouterModule.forChild(childRoutes)],
  exports:[ RouterModule ]
})
export class ChildRotuesModule { }
