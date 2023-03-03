import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';
import { EMPTY, from, Observable, throwError } from 'rxjs';

describe('MedicosComponent', () => {

    let componente: MedicosComponent;

    const servicio = new MedicosService(null!);




    beforeEach( () => {
        componente = new MedicosComponent(servicio);
    });


    it('Init: Debe de cargar los médicos', () => {

        const medicos = ['Medico 1','Medico 2','Medico 3'];

        spyOn(servicio,'getMedicos').and.callFake(()=>{

            return from([medicos]);
        });

        componente.ngOnInit();
        expect(componente.medicos.length).toBeGreaterThan(0);
   
    });

    it('Debe de llamar al servidor para agregar un médico', () => {

        const espia = spyOn(servicio, 'agregarMedico').and.callFake( medico => {
            return EMPTY;
        });

        componente.agregarMedico();

        expect(espia).toHaveBeenCalled();


    });

    it('Debe de agregar un nuevo médico al arreglo de médicos', () => {

        const medico = {id:1, nombre: 'Ricardo'}

        spyOn(servicio,'agregarMedico')
                .and.returnValue(from([medico]));

        componente.agregarMedico();
        expect(componente.medicos.length ).toBe(1);
        expect(componente.medicos.indexOf(medico) ).toBeGreaterThanOrEqual(0);
    });

    it('Si falla la adicción, la propiedad mensajeError, debe de ser igual al error del servicio', ()=> {

        const miError = "No se pudo agregar el método";

        spyOn(servicio,'agregarMedico').and
                .returnValue(throwError(
                     () => new Error(miError)
                     ));

        componente.agregarMedico();

        expect(componente.mensajeError).toBe(miError);
    });

    it('Debe de llamar al servidor para borrar un médico', ()=> {

    spyOn(window,'confirm').and.returnValue(true);

     const espia = spyOn(servicio, 'borrarMedico')
                            .and.returnValue(EMPTY);

    componente.borrarMedico('1');

    expect(espia).toHaveBeenCalledWith('1');

    });

    it('No Debe de llamar al servidor para borrar un médico', ()=> {

        spyOn(window,'confirm').and.returnValue(false);
    
         const espia = spyOn(servicio, 'borrarMedico')
                                .and.returnValue(EMPTY);
    
        componente.borrarMedico('1');
    
        expect(espia).not.toHaveBeenCalledWith('1');
    
        });

});
