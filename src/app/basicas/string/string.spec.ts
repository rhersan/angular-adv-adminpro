import { mensaje } from './string';
import { TestBed } from '@angular/core/testing';
// Agreupar pruebas
//describe('Pruebas de Strings');
// Una prueba
//it('Debe de regresar un string');

describe('Pruebas de strings', () => {
    
    it('Debe de regresar un string',() => {

        const resp = mensaje('Ricardo');

        expect( typeof resp  ).toBe('string');

    });

    it('Debe de regresar un saludo con el nombre enviado',() => {

        const nombre= 'Ricardo';
        const resp = mensaje(nombre);

        expect( resp ).toContain(`Saludos ${nombre}`);

    });

});