import CasoDeUso from "../../shared/CasoDeUso";
import { Usuario } from "../../usuario";
import Agendamento from "../model/Agendamento";
import RepositorioAgendamento from "../provider/RepositorioAgendamento";

type NovoAgendamentoParams = {
    agendamento: Agendamento
    usuario: Usuario
}

export default class NovoAgendamento implements CasoDeUso<NovoAgendamentoParams, void> {
    constructor( private readonly repo: RepositorioAgendamento){}

    async executar(params: NovoAgendamentoParams): Promise<void> {
        const { usuario, agendamento } = params

        console.log(usuario, agendamento.usuario)
        if(usuario.id !== agendamento.usuario.id) {
            throw new Error('Não é possivel criar um agendamento para outro usuário')
        }
        
        await this.repo.criar(params.agendamento)
    }

}