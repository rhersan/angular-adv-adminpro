import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;


  constructor(private fb: FormBuilder,
              private _usuarioService: UsuarioService,
              private _fileUploadService: FileUploadService)
              {
                this.usuario = _usuarioService.usuario;
              }
get uid():string{
  return this.usuario.uid!;
}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre || '', Validators.required],
      email: [this.usuario.email || '', [Validators.required, Validators.email] ]
    });
  }

  actualizarPerfil(){
    this._usuarioService.actualizarPerfil(this.perfilForm.value)
        .subscribe({
          next: (resp: any ) => {
              const {nombre, email} = resp.usuario;
              this.usuario.nombre = nombre;
              this.usuario.email  = email;
              Swal.fire('Correcto',
                        'Actualizado correctamente!',
                        'success'
              );
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

  cambiarImagen( file: File){
    this.imagenSubir = file;   

    if( !file ) {
       this.imgTemp = null;
       return;
    }

    const reader =  new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp =  reader.result;
    }
  }

  subirImagen(){
    console.log(this.uid);
    this._fileUploadService
      .actualizarFoto(this.imagenSubir,'usuarios',this.uid)
      .then( img  =>  {
          this.usuario.img = img;
          Swal.fire('Actualizado',
                'Imagen actualizado correctamente!',
                'success'
          );
      })
      .catch( err => {
        console.log(err);
        Swal.fire('Error',
                      'No se pudo subir la imagen',
                      'error'
            );
      });

  }
}
