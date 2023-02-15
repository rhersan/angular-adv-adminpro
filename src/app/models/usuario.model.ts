export class Usuario {
    
    constructor(
        public nombre: string,
        public email: string,
        public role: string,
        public google: boolean,
        public img: string,
        public status: number,
        public password?: string,
        public uid?: string ) {

    }
        
}