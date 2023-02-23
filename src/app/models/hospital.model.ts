import { environment } from "../environments/environment"; 

const base_url = environment.base_url;

export class Hospital {
    
    constructor(
        public nombre: string,
        public status: number,
        public usuario: string,
        public img?: string,
        public uid?: string ) {

    }
    get imagenUrl() {
        
        if (this.img?.includes('https')) {
            return this.img;
        } else if (this.img) {
            return `${base_url}/upload/hospitales/${this.img}`
        } else {
            return `${base_url}/upload/hospitales/noimage`;
        }

    }
        
}