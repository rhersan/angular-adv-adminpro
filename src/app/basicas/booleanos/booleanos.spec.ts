import { usuariosIngresado } from './booleanos';

describe('Booleanos', ()=> {
    it('Debe regresar un true', () =>{
        const resp = usuariosIngresado();
        expect(resp).toBe(true);
    })
});