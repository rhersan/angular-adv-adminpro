import { environment } from "../environments/environment"; 

const base_url = environment.base_url;

export class Usuario {
    
    constructor(
        public nombre: string,
        public email: string,
        public status: number,
        public google?: boolean,
        public role?: string,
        public img?: string,
        public password?: string,
        public uid?: string ) {

    }

    imprimirUsuario(){
        console.log( this.nombre);
    }

    get imagenUrl() {
        //

        if(this.img?.includes('https')){
            return this.img;
        }

        if(this.img){
            return `${base_url}/upload/usuarios/${this.img}`
        }else{
            return `${base_url}/upload/usuarios/noimage`;
        }
        
    }
        
}