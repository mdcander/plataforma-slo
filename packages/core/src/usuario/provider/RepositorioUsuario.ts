import { Usuario } from "../model/Usuario";

export default interface RegistrarUsuario {
    salvar(usuario: Usuario): Promise<void>
    buscarPorEmail(email: string): Promise<any>
}