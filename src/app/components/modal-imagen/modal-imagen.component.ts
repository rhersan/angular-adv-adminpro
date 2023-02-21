import { Component, OnInit, EventEmitter } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent{

  public usuario!: Usuario;  
  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor(public modalImagenService: ModalImagenService,
              private _fileUploadService: FileUploadService){

  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this._fileUploadService
      .actualizarFoto(this.imagenSubir,tipo,id)
      .then( img  =>  {
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
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
