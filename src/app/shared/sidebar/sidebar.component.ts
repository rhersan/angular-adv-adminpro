import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario!: Usuario;
  public menu: any = null!;
  constructor(public sidebarService:SidebarService,
              private _usuarioService: UsuarioService) {
  }
  ngOnInit(): void {
    this.menu = this.sidebarService.getMenu();
    this.usuario = this._usuarioService.usuario;
  }

  logout(){
    this._usuarioService.logout();
  }
}
