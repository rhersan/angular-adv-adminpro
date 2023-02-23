import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Hospital } from '../models/hospital.model';
import { map, tap } from 'rxjs';

const base_url =  environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales(desde: number){
    const url = `${base_url}/hospitales?desde=${desde}`;
    return this.http.get(url, this.headers);
  }
  hospitalesLista(){
    const url = `${base_url}/hospitales/select`;
    return this.http.get(url,this.headers);
  }
 actualizarHospital(hospital: Hospital){
  const url = `${base_url}/hospitales/${hospital.uid}`;
  return this.http.put(url,{nombre: hospital.nombre}, this.headers);
 }

  crearHospital(nombre: string){
    const url = `${base_url}/hospitales`;
    return this.http.post(url,{nombre},this.headers);

  }

  eliminarHospital(id:string){
    const url = `${base_url}/hospitales/${id}`;
    return this.http.delete(url, this.headers);
  }
}
