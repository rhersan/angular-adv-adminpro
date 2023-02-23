import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
export interface IBusquedas{
    ok: boolean,
    usuarios: Usuario[],
    hospitales: Hospital[],
    medicos: Medico[]
}