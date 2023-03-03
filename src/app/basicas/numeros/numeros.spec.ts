import { incrementar } from './numeros';


describe('Pruebas de números', ()  => {

    it('Debe retornar 100, si el número ingresado es mayor a 100', () => {
        const numero = incrementar(150);
        expect(numero).toBe(100);
    });

    it('Debe retornar el número intregado + 1, si no es mayor a 100', () => {
        const numero = incrementar(10);
        expect(numero).toBe(11);
    });


});