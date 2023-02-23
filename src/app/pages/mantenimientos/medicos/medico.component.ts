import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Medico } from '../../../models/medico.model';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { map, tap, catchError, Subscription, delay } from 'rxjs';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit, OnDestroy{

  public medicoForm!: FormGroup;

  public hospitales: Hospital[] = [];

  public medicoSeleccionado!: Medico;
  public hospitalSeleccionado!: Hospital;

  private routeSub!: Subscription;
  public nombre: string = '';
  public hospital: string = '';


  

  constructor(private fb:FormBuilder,
              private _medicoService: MedicoService,
              private _hospitalService: HospitalService,
              private router: Router,
              private activateRouter: ActivatedRoute){
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
  ngOnInit(): void {

    this.routeSub = this.activateRouter.params.subscribe(({id}) => this.cargarMedico(id) );

    this.medicoForm = this.fb.group({
      'nombre':['' , Validators.required],
      'hospital':['',Validators.required]
    });
    this.listaHospitales();
    

    this.eventoSelect();
    

    
  }
  eventoSelect(){
    this.medicoForm.get('hospital')?.valueChanges
        .subscribe({
          next: hospitalId => {
            this.hospitalSeleccionado = this.hospitales.find(h => h.uid === hospitalId)!;
          },
          error: err => console.log
        });
  }

  listaHospitales(){
    this._hospitalService.hospitalesLista()
        .pipe(
          map( (resp:any) => resp.hospitales)
        )
        .subscribe({
          next: (hospitales:Hospital[]) => {
            this.hospitales = hospitales;
          },
          error: (err) => {
            console.log(err);
          }
        });
  }

  cargarMedico(id: string){
    if(!id){
      return;
    }

    this._medicoService.obtenerMedicoPorId(id)
      .subscribe({
        next: (medico) => {
          if (!medico) {
            this.router.navigateByUrl('/dashboard/medicos');
            return;
          }
          const { nombre, hospital: { _id } } = medico;
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({ nombre, hospital: _id });
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  guardar(){
    if(!this.medicoSeleccionado){
    // Crear
    this._medicoService. crearMedico(this.medicoForm.value)
      .subscribe({
        next: async (resp:any) => {
          console.log(resp);
          await Swal.fire('Creado!', resp.msg, 'success')
              .then((result) =>{
                if(result.isConfirmed){
                  this.router.navigateByUrl('/dashboard/medicos');
                }
              });
        },
        error: (err) => {
          console.log('error',err.erros);
          Swal.fire('Error',err.error.msg,'error');
        }
      });
    }else{
      // Actualizar
      const data = {
        ... this.medicoForm.value,
        uid: this.medicoSeleccionado.uid
      }
      
      this._medicoService.actualizarMedico(data)
          .subscribe({
            next:async (resp:any) => {
              await Swal.fire('Actualizado!', resp.msg, 'success')
              .then((result) =>{
                if(result.isConfirmed){
                  this.router.navigateByUrl('/dashboard/medicos');
                }
              });

            },
            error: (err:any) => {
              if(err.error.erros){
                Swal.fire('Error',err.error.erros.hospital.msg,'error');
              }else{
                Swal.fire('Error',err.error.msg,'error');
              }
            }
          });
    }
  }

  regresar(){
    this.router.navigateByUrl('/dashboard/medicos');
  }

}
