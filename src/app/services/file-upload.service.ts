import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';


const base_url =  environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ){
    try{
      const url = `${base_url}/upload/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen',archivo);
      const resp = await fetch(url,{
        method: 'PUT',
        headers: {
          'x-token': this.token
        },
        body: formData
      });
      const data = await resp.json();

      if(data.ok){
        return data.nombreArchivo;
      }else{
        console.log(data);
        return false;
      }
      
    }catch(error){

    }
  }

}
