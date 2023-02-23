import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, retry } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate /*CanLoad*/ {

  constructor(private _usuarioService: UsuarioService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this._usuarioService.rol === 'ADMIN_ROLE') {
      return true;
    } else {
      this.router.navigateByUrl('dashboard');
      return false;
    }
  }
  /*
  canLoad(
    route: Route,
    segments: UrlSegment[]): {
    return true;
  }*/
}
