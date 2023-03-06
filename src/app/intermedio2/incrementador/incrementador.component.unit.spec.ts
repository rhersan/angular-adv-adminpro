import { IncrementadorComponent } from '../../components/incrementador/incrementador.component';


describe('Incrementador Component Unit', ()=>{

    let component: IncrementadorComponent;

    beforeEach( ()=> component = new IncrementadorComponent() );

    it('No debe de pasar de 100 el progreso', ()=>{
        component.progress = 50;

        component.cambiarValor(5);

        expect(component.progress).toBe(55);
    })
});