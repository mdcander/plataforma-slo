import Servico from "../model/Servico";


export default interface RepositorioProfissional {
    buscarTodos(): Promise<Servico[]>
}