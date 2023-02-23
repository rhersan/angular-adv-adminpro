import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { IResponseList } from '../../../interfaces/response.interfaces';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public desde        : number = 0;
  public usuarios!    : Usuario[];
  public usuariosTemp!    : Usuario[];
  public cargando     : boolean=  false;
  public imgSubs!: Subscription;

  constructor(private _usuarioService: UsuarioService,
              private _busquedasService: BusquedasService,
              private _modalImagenService: ModalImagenService){
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this._modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
      console.log(img);
      this.cargarUsuarios();
    } );
  }

  cambiarPaginado(valor: number){
    this.desde += valor;

    if (this.desde <= 0) {
      this.desde = 0
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    
    this._usuarioService.cargarUsuario(this.desde)
    .subscribe({
      next: (resp: IResponseList) => {
        const {total, usuarios} =  resp;
        this.totalUsuarios =  total;       
        this.usuarios =  usuarios;      
        this.usuariosTemp =  usuarios;      
        this.cargando = false;  
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  buscador( termino: string ){
    if(termino.length === 0){
      this.usuarios = this.usuariosTemp;
      return;
    }
    this._busquedasService.buscador('usuarios',termino)
      .subscribe({
        next: (resp:any) => {
          this.usuarios = resp;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  eliminar(usuario: Usuario){

    const {uid,nombre} = usuario;

    if(uid === this._usuarioService.uid){
      Swal.fire('Error',
              `${nombre}, No puede borrarse a si mismo.`,
              'error'
            );
      return;
    }
    
    Swal.fire({
      title: `¿Esta seguro de eliminar el usuario?`,
      text: nombre,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red'
    }).then((result) => {

      if (result.isConfirmed) {
        this._usuarioService.eliminarUsuario(uid!)
          .subscribe({
            next: (resp) => {
              Swal.fire('Eliminado!',
              'Registro eliminado correctamente',
              'success'
              );
              this.cargarUsuarios();
            },
            error: (err) => {
              Swal.fire('Error',
              err.error.msg,
              'error'
            );
            }
          });

      }

    })
  }


  cambiarRol(usuario:Usuario){
    console.log('Cambiar:',usuario);
    this._usuarioService.guardarUsuario(usuario)
        .subscribe({
          next: (resp) => {
            console.log(resp);
          },
          error: (err) => {
            console.log(err);
            Swal.fire('Error',
                      err.error.msg,
                      'error'
                    );
          }
        });
  }


  cambiarImagen(usuario: Usuario){
    this._modalImagenService.abrirModal('usuarios',usuario.uid!,usuario.img);

  }

}
