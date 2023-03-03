import { Component, OnInit } from '@angular/core';
import { MedicosService } from './medicos.service';
import { mensaje } from '../../basicas/string/string';

@Component({
  selector: 'app-medicos',
  template: `
    <p>
      medicos works!
    </p>
  `,
  styles: []
})
export class MedicosComponent implements OnInit {

  public medicos: any[] = [];
  public mensajeError!: string;

  constructor( public _medicoService: MedicosService ) { }

  ngOnInit() {
    this._medicoService.getMedicos()
          .subscribe( medicos => this.medicos = medicos );
  }

  agregarMedico() {
    const medico = { nombre: 'Médico Juan Carlos' };

    this._medicoService.agregarMedico(medico)
          .subscribe({
            next: (resp: any) => {
              this.medicos.push(resp);
            },
            error: (err:any) => {
              console.log('error',err);
              this.mensajeError = err.message;
            }
          }
          );
  }

  borrarMedico(id: string) {
    const confirmar = confirm('Estas seguro que desea borrar este médico');

    if ( confirmar ) {
      this._medicoService.borrarMedico( id );
    }

  }

}
