import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Route, Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';

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
              public _busquedasService: BusquedasService,
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
    this._medicoService.cargarMedicos(this.desde)
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
    if(termino.length === 0){
      this.medicos = this.medicosTemp;
      return;
    }
    this._busquedasService.buscador('medicos',termino)
      .subscribe({
        next: (resp:any) => {
          this.medicos = resp;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  cambiarImagen(medico: Medico){
    this.modalImagenService.abrirModal('medicos',medico.uid!, medico.img);
  }

  editar(id:string){
    this.route.navigateByUrl(`/dashboard/medico/${id}`);
  }

  eliminar(medico: Medico){
    const {uid,nombre} =  medico;
    console.log(uid);
    Swal.fire({
      title: `¿Esta seguro de eliminar el medico?`,
      text: nombre,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red'
    }).then((result) => {

      if (result.isConfirmed) {
        this._medicoService.eliminar(uid!)  
        .subscribe({
          next: (resp: any) => {
            Swal.fire('Eliminado', resp.msg, 'success');
            this.cargarMedicos();
          },
          error: (err) =>{
            console.log(err);
            Swal.fire('Error', err.error.msg,'error');
          }
        });

      }

    });
  }

  cambiarPaginado(valor: number){
    this.desde += valor;

    if (this.desde <= 0) {
      this.desde = 0
    } else if (this.desde >= this.totalMedicos) {
      this.desde -= valor;
    }

    this.cargarMedicos();
  }
  nuevo(){
    this.route.navigateByUrl('/dashboard/medico/nuevo');
  }
}
