import { obtenerRobots } from './arreglos';


describe('Pruebas de arreglos', () => {

    it('Debe retornar al menos 3 roboots', () => {
        const resp = obtenerRobots();
        expect(resp.length).toBeGreaterThanOrEqual(3);
    });


    it('Debe existir Megan y Ultron', () => {
        const resp = obtenerRobots();
        expect(resp).toContain('MegaMan');
        expect(resp).toContain('Ultron');
    });
    
});