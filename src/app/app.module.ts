import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
// Componentes
import { AppComponent } from './app.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptors/interceptor.service';
import { MedicosComponent } from './intermedio/espias/medicos.component';
import { MedicoComponent } from './intermedio2/medico/medico.component';
import { HospitalComponent } from './intermedio2/hospital/hospital.component';
import { IncrementadorComponent } from './intermedio2/incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { MedicoService } from './intermedio2/medico.service';


@NgModule({
  declarations: [
    AppComponent,
    NotpagefoundComponent,
    MedicosComponent,
    MedicoComponent,
    HospitalComponent,
    IncrementadorComponent
  ],
  imports: [
    FormsModule,/// Pruebas
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    SharedModule,
    AuthModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },
  MedicoService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
