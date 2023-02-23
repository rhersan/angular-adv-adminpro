import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { tap, map, Observable, catchError, of, delay } from 'rxjs';

import { IRegisterForm } from '../interfaces/register-form.interfaces';
import { ILoginForm } from '../interfaces/login-form.interfaces';
import { Usuario } from '../models/usuario.model';
import { IResponseList } from '../interfaces/response.interfaces';

declare const google: any;
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

  get rol(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role!;
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  logout(){
    localStorage.removeItem('token');    
    localStorage.removeItem('menu');
    
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
    return this.http.get(url,this.headers)
    .pipe(
      map( (resp: any) => {
        const { nombre, email, role, img = '', uid, google, status } = resp.usuario;
        this.usuario = new Usuario(nombre, email,status,google,role,img,'',uid);        
        this.guardarLocalStorage(resp.token, resp.menu);
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
                this.guardarLocalStorage(resp.token, resp.menu);
              })
            );
  }

  actualizarPerfil(data: { email: string, nombre: string, role?:string } ){
    const url = `${base_url}/usuarios/${this.uid}`;
    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(url, data, this.headers);
    

  }

  login( formData: ILoginForm ){
    const url= `${ base_url }/login`;
    return this.http.post(url, formData)
            .pipe(
              tap( (resp:any) => {
                this.guardarLocalStorage(resp.token, resp.menu);
              })
            );
  }

  loginGoogle(token: string){
    const url = `${base_url}/login/google`;
    return this.http.post(url,{token})
        .pipe(
          tap( (resp: any) => {
            this.guardarLocalStorage(resp.token, resp.menu);
          })
        );
  }

  cargarUsuario(desde: number = 0):Observable<IResponseList>{
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<IResponseList>(url,this.headers)
            .pipe(
              map( resp => {
                const usuarios = resp.usuarios.map(user => new Usuario(user.nombre,user.email,user.status, user.google, user.role, user.img, '',user.uid));
                return {
                  ok: resp.ok,
                  total: resp.total,
                  usuarios: usuarios
                }
              })
            );
  }

  eliminarUsuario(id: string){
    const url = `${base_url}/usuarios/${id}`;
    return this.http.delete(url, this.headers);

  }

  guardarUsuario(usuario: Usuario){
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.put(url, usuario, this.headers);
  }

  guardarLocalStorage(token:string, menu: any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

}
