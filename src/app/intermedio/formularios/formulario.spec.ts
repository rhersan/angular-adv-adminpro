import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormularioRegister } from './formulario';
describe('Formularios', () => {

    let component: FormularioRegister;

    beforeEach(() => component = new FormularioRegister(new FormBuilder) );

    it('Debe de crear un formulario con dos campos, email y password', () => {



        expect(component.form.contains('email')).toBeTruthy();
        expect(component.form.contains('password')).toBeTruthy();
    });

    it('El email debe de ser obligatorio', () => {
        const campo = component.form.get('email');

        campo?.setValue('');
        expect(campo?.valid).toBeFalsy();
    });

    it('El email debe de ser correo válido', () => {
        const campo = component.form.get('email');
        campo?.setValue('ricardo@dev.com');
        expect(campo?.valid).toBeTruthy();
    });


});