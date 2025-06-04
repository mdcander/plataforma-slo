import CasoDeUso from "../../shared/CasoDeUso";
import { Usuario } from "../../usuario";
import RepositorioAgendamento from "../provider/RepositorioAgendamento";

type Entrada = {
    usuario: Usuario
    id: number
}
export default class ExcluirAgendamento implements CasoDeUso<Entrada, void> {
    constructor( private readonly repo: RepositorioAgendamento ){}
    
    async executar(entrada: Entrada): Promise<void> {
        const { usuario, id } = entrada
        const agendamento = await this.repo.buscarPorId(id)

        if(!agendamento) {
            throw new Error('Agendamento não encontrado')
        }

        const cliente = agendamento.usuario.email === usuario.email
        const profissional = usuario.administrador

        if (!cliente && !profissional) {
            throw new Error('Usuario não autorizado')
        }

        await this.repo.excluir(id)

    }
}