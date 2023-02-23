import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit,OnDestroy {
  public hospitales!: Hospital[];
  public hospitalesTemp!: Hospital[];
  public desde        : number = 0;
  public cargando: boolean = false;
  public totalHospitales: number = 0;
  public imgSubs!: Subscription;

  constructor(private _hospitalService: HospitalService,
              public modalImagenService: ModalImagenService,
              public _busquedasService: BusquedasService){}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .subscribe(img => {
      this.cargarHospitales();
    } );
  }

  buscador(termino:string){
    if(termino.length === 0){
      this.hospitales = this.hospitalesTemp;
      return;
    }
    this._busquedasService.buscador('hospitales',termino)
      .subscribe({
        next: (resp:any) => {
          this.hospitales = resp;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
  cambiarImagen(hospital: Hospital){
    this.modalImagenService.abrirModal('hospitales',hospital.uid!, hospital.img);

  }

  eliminar(hospital: Hospital){
    const {uid,nombre} =  hospital;
    Swal.fire({
      title: `¿Esta seguro de eliminar el hospital?`,
      text: nombre,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red'
    }).then((result) => {

      if (result.isConfirmed) {
        this._hospitalService.eliminarHospital(uid!)  
        .subscribe({
          next: (resp: any) => {
            Swal.fire('Eliminado', resp.msg, 'success');
            this.cargarHospitales();
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
    } else if (this.desde > this.totalHospitales) {
      this.desde -= valor;
    }

    this.cargarHospitales();
  }

  cargarHospitales(){
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde)
        .subscribe({
          next: (resp:any) => {
            this.hospitales = resp.hospitales;
            this.hospitalesTemp = resp.hospitales;
            this.totalHospitales = resp.total;
            this.cargando = false; 
          },
          error: (err) => {
            console.log(err);
          }
        });
  }

  guardarCambios(hospital: Hospital){
    this._hospitalService.actualizarHospital(hospital)
        .subscribe({
          next: (resp) => {
            Swal.fire('Actualizado', hospital.nombre, 'success');
          },
          error: (err) => {
            console.log(err);
            Swal.fire('Error', err.error.msg, 'error');
          }
        });
  }

  async abrirSwalAlert(){
    await Swal.fire({
      input: 'text',
      inputLabel: 'Nombre del Hospital:',
      inputPlaceholder: 'Escriba aquí...',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Registrar'
    }).then((result) => {

      if (result.isConfirmed) {
        if(result.value.trim().length >0 ){
          this._hospitalService.crearHospital(result.value)  
          .subscribe({
            next: (resp: any) => {
              Swal.fire('Agregado', 'Agregado correctamente!', 'success');
              this.hospitales.push(resp.hospital);
            },
            error: (err) =>{
              console.log(err);
              Swal.fire('Error', err.error.msg,'error');
            }
          });
        }else{
          console.log('Ingrese un nombre');
        }

      }

    });
  }
}
