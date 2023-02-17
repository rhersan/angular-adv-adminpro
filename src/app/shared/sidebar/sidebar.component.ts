import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public usuario!: Usuario;
  public menu: any = null!;
  constructor(private sidebarService:SidebarService,
              private _usuarioService: UsuarioService) {
    this.menu = this.sidebarService.menu;

    this.usuario = _usuarioService.usuario;
  }

  logout(){
    console.log('logout');
    this._usuarioService.logout();
  }
}
