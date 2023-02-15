import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
constructor(private _usuarioService: UsuarioService,
            private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      console.log('Paso por el canActivate del guard');
      return this._usuarioService.validarToken()
        .pipe(
          tap(estaAutenticado => {
            if( !estaAutenticado ){
              this.router.navigateByUrl('/auth/login');
            }
          })
        );
  }
  
}
