import { Profissional } from "../../profissional"
import Servico from "../../servico/model/Servico"
import { Usuario } from "../../usuario"

export default interface Agendamento {
    id: number
    data: Date
    usuario: Partial<Usuario>
    profissional: Partial<Profissional>
    servicos: Partial<Servico>[]
}