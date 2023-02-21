import { Usuario } from '../models/usuario.model';
export interface IResponseList
{
    ok: boolean;
    total: number;
    usuarios: Usuario[];
}