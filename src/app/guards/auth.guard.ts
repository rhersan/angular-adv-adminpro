import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {
  
constructor(private _usuarioService: UsuarioService,
            private router: Router){}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this._usuarioService.validarToken()
        .pipe(
          tap(estaAutenticado => {
            if( !estaAutenticado ){
              this.router.navigateByUrl('/auth/login');
            }
          })
        );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
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
