import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UsuarioService } from './usuario.service';
import { map, Observable } from 'rxjs';
import { IResponseList } from '../interfaces/response.interfaces';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { IBusquedas } from '../interfaces/busquedas.interfaces';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient,
    private _usuarioService: UsuarioService) {

  }
  
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios(resultados: any[]): Usuario[]{

    return resultados.map(
      user => new Usuario(user.nombre,user.email,user.status, user.google, user.role, user.img, '',user.uid)
    );
  }

  private transformarHospitales(resultados: any[]): Hospital[]{
    return resultados.map(
      h => new Hospital(h.nombre,h.status, h.Usuario, h.img, h.uid)
    );
  }

  private tranformarMedicos(resultados: any[]): Medico[]{
    return resultados.map(
      m => new Medico(m.nombre, m.status, m.hospital, m.usuario, m.img, m.uid)
    );
  }

  buscador(
      tipo: 'usuarios' | 'medicos' | 'hospitales',
      termino: string){    
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get(url, this.headers )
            .pipe(
              map( (resp:any) =>{
                const {resultados} = resp;
                switch(tipo){
                  case 'usuarios':
                    return this.transformarUsuarios(resultados);
                  case 'hospitales':
                    return this.transformarHospitales(resultados);
                  case 'medicos':
                    return this.tranformarMedicos(resultados);
                    default:
                      return [];
                }
              }  
              )
            );
  }

  buscadorGlobal(termino: string):Observable<IBusquedas>{
    const url = `${base_url}/todo/${termino}`;
    return this.http.get<IBusquedas>(url,this.headers);
  }


}
