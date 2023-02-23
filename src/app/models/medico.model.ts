import { environment } from "../environments/environment"; 
import { Hospital } from './hospital.model';

const base_url = environment.base_url;

export class Medico {
    
    constructor(
        public nombre: string,
        public status: number,
        public hospital: Hospital,
        public usuario: string,
        public img?: string,
        public uid?: string ) {

    }
    get imagenUrl() {
        
        if (this.img?.includes('https')) {
            return this.img;
        } else if (this.img) {
            return `${base_url}/upload/medicos/${this.img}`
        } else {
            return `${base_url}/upload/medicos/noimage`;
        }

    }
        
}