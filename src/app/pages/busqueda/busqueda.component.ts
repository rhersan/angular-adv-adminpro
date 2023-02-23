import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusquedasService } from '../../services/busquedas.service';
import { ActivatedRoute, Route,  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBusquedas } from '../../interfaces/busquedas.interfaces';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit, OnDestroy {

  private routeSub!: Subscription;
  public usuarios  : Usuario [] = [];
  public medicos   : Medico  [] = [];
  public hospitales: Hospital[] = [];


  constructor(private _busquedasService: BusquedasService,
              private router: Router,
              private _activateRoute:ActivatedRoute){
      
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
  ngOnInit(): void {

    this.routeSub = this._activateRoute.params.subscribe(({termino})=>{
      this.buscadorGlobal(termino);
    });

  }

  buscadorGlobal(termino: string){
    if(termino.trim().length === 0){
      return;
    }
    this._busquedasService.buscadorGlobal(termino)
        .subscribe({
          next: ({ok,usuarios,hospitales,medicos}) => {            
            if(ok){
              this.usuarios   = usuarios;
              this.hospitales = hospitales;
              this.medicos    = medicos;
            }
          },
          error: (err)=>{
            console.log(err);
          }
        });
  }

  abrirMedico(id:string){
    this.router.navigateByUrl(`/dashboard/medico/${id}`);
  }
}
