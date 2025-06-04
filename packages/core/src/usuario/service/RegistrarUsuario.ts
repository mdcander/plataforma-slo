import CasoDeUso from "../../shared/CasoDeUso";
import { Usuario } from "../model/Usuario";
import ProvedorCripto from "../provider/ProvedorCripto";
import RepositorioUsuario from "../provider/RepositorioUsuario";

export default class RegistrarUsuario implements CasoDeUso<Usuario, void> {
    
    constructor(
        private readonly repo: RepositorioUsuario,
        private readonly cripto: ProvedorCripto
    ){}

    async executar(usuario: Usuario): Promise<any> {
        
        const usuarioExistente = await this.repo.buscarPorEmail(usuario.email)
        console.log('Registrar usuario', usuarioExistente)

        if(usuarioExistente) {
            throw new Error('Usuário já existe');
        }

        console.log('Registrar usuario - usuario', usuario)

        const senhaCripto = await this.cripto.criptografar(usuario.senha);
        const novoUsuario = {
            ...usuario,
            senha: senhaCripto,
            celular: '',
            cnpj_cpf: '',
            administrador: false
        }
        console.log('Registrar novo usuario', novoUsuario)
        await this.repo.salvar( novoUsuario )
    }
    
}