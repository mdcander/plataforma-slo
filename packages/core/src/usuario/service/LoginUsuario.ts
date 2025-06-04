import CasoDeUso from "../../shared/CasoDeUso";
import { Usuario } from "../model/Usuario";
import ProvedorCripto from "../provider/ProvedorCripto";
import RepositorioUsuario from "../provider/RepositorioUsuario";

type Entrada = {
    email: string
    senha: string
}

export default class LoginUsuario implements CasoDeUso<Entrada, Usuario> {
    
    constructor(
        private readonly repo: RepositorioUsuario,
        private readonly crypto: ProvedorCripto
    ){}

    async executar(entrada: Entrada): Promise<Usuario> {
        
        const { email, senha } = entrada
        const usuario = await this.repo.buscarPorEmail(email);
        if (!usuario) throw new Error('Usuário não encontrado')
        
        const mesmaSenha = await this.crypto.comparar(senha, usuario.senha)
        if (!mesmaSenha) throw new Error('Senha incorreta!')
        
        delete usuario.senha;
        return usuario

    }
    
}