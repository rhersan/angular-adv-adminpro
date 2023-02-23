import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean =  true;
  public tipo!: 'usuarios' | 'medicos' | 'hospitales';
  public id!: string;
  public img!: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get uid(){
    return this.id
  }

  get ocultarModal(){
    return this._ocultarModal;
  }
  
  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'x'
  ){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img!;
    
    if (!img) {
      this.img = `${base_url}/upload/usuarios/noimage`;
    }else if(img?.includes('https')){
      this.img = img;
    }else{
      this.img = `${ base_url }/upload/${ tipo }/${ img }`;
    }

  }

  cerrarModal(){
    this._ocultarModal = true;
  }

}
