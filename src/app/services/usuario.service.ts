import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegisterForm } from '../interfaces/register-form.interfaces';
import { ILoginForm } from '../interfaces/login-form.interfaces';
import { environment } from '../environments/environment';
import { tap, map, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;
declare const gapi: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) { 

  }
  
  logout(){
    localStorage.removeItem('token');    

    google.accounts.id.revoke('hersanoficial@gmail.com', () => {  
      this.ngZone.run( () => {
        this.router.navigateByUrl('/auth/login');
      });    
    });


  }

  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    const url = `${base_url}/login/renew`;
    return this.http.get(url,{
      headers: {
        'x-token': token
      }
    })
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
      catchError( error => of(false))
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
