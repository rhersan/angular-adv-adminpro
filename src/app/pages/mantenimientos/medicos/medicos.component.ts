import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Route, Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {
  public medicos!: Medico[];
  public medicosTemp!: Medico[];
  public cargando: boolean = false;
  public totalMedicos: number = 0;
  public desde: number = 0;
  public imgSubs!: Subscription;
  
  constructor(private _medicoService: MedicoService,
              public modalImagenService: ModalImagenService,
              private route: Router){}
  
  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .subscribe(img => {
      console.log(img);
      this.cargarMedicos();
    } );
  }

  cargarMedicos(){
    this.cargando = true;
    this._medicoService.cargarMedicos(10)
        .subscribe({
          next: (resp: any) => {
            this.cargando = false;
            this.totalMedicos = resp.total;
            this.medicos = resp.medicos;
            this.medicosTemp = resp.medicos;
          },
          error: (err) => {
            console.log(err);
          }
        });
  }

  buscador(termino: string){

  }

  cambiarImagen(medico: Medico){
    this.modalImagenService.abrirModal('medicos',medico.uid!, medico.img);
  }

  editar(id:string){
    this.route.navigateByUrl(`/dashboard/medico/nuevo/${id}`);
  }

  eliminar(medico: Medico){

  }

  cambiarPaginado(desde: number){

  }
  nuevo(){
    this.route.navigateByUrl('/dashboard/medico/nuevo');
  }
}
