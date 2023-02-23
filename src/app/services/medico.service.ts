import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { map } from 'rxjs';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

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

  cargarMedicos(desde: number){
    const url = `${base_url}/medicos?desde=${desde}`;
    return this.http.get(url,this.headers);
  }

  crearMedico(medico: Medico){
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico,this.headers);

  }

  obtenerMedicoPorId(id:string){
    const url = `${base_url}/medicos/${id}`;
    return this.http.get(url,this.headers)
        .pipe(
          map( (resp:any) => resp.medico)
        );
  }

  actualizarMedico(medico: Medico){
    const url = `${base_url}/medicos/${medico.uid}`;
    return this.http.put(url, medico, this.headers);
  }
}
