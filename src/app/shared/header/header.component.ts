import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  public usuario!: Usuario;
  constructor(private _usuarioService: UsuarioService,
              private router: Router){ 
    this.usuario = _usuarioService.usuario;
  }

  logout(){
    console.log('logout');
    this._usuarioService.logout();
  }

  buscar(termino: string){
    if(termino.trim().length === 0){
     return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }
}
