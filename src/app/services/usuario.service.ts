import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { tap, map, Observable, catchError, of } from 'rxjs';

import { IRegisterForm } from '../interfaces/register-form.interfaces';
import { ILoginForm } from '../interfaces/login-form.interfaces';
import { Usuario } from '../models/usuario.model';

declare const google: any;
declare const gapi: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;
  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) { 

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.usuario.uid!;
  }

  get rol(): string {
    return this.usuario.role!;
  }

  logout(){
    localStorage.removeItem('token');    

    google.accounts.id.revoke(this.usuario.email, () => {  
      this.ngZone.run( () => {
        this.router.navigateByUrl('/auth/login');
      });    
    });


  }

  validarToken():Observable<boolean>{

    google.accounts.id.initialize({
      client_id: "14725285314-sjtueidoev71ie5htanqb4kp4143gdf2.apps.googleusercontent.com",
    });

    const url = `${base_url}/login/renew`;
    return this.http.get(url,{
      headers: {
        'x-token': this.token
      }
    })
    .pipe(
      map( (resp: any) => {
        const { nombre, email, role, img = '', uid, google, status } = resp.usuario;
        this.usuario = new Usuario(nombre, email,status,google,role,img,'',uid);        
        localStorage.setItem('token', resp.token);
        return true;
      }),      
      catchError( error => {
        console.error(error);
        return of(false);
      })
    );
  }

  crearUsuario(formData: IRegisterForm){
    console.log('Creando Usuario', formData);
    return this.http.post(`${ base_url}/usuarios`, formData)
            .pipe(
              tap( (resp:any) => {
                localStorage.setItem('token', resp.token);
              })
            );
  }

  actualizarPerfil(data: { email: string, nombre: string, role?:string } ){

    // if(data.email === this.usuario.email && data.nombre === this.usuario.nombre){
    //   return Observable;
    // }
    const url = `${base_url}/usuarios/${this.uid}`;
    data.role = this.rol;
    return this.http.put(url, data, {
      headers: {
      'x-token': this.token
      }
    });
    

  }

  login( formData: ILoginForm ){
    const url= `${ base_url }/login`;
    return this.http.post(url, formData)
            .pipe(
              tap( (resp:any) => {
                localStorage.setItem('token', resp.token);
              })
            );
  }

  loginGoogle(token: string){
    const url = `${base_url}/login/google`;
    return this.http.post(url,{token})
        .pipe(
          tap( (resp: any) => {
            localStorage.setItem('token', resp.token);
          })
        );
  }
}
