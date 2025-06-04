import { RepositorioServico } from "..";
import CasoDeUso from "../../shared/CasoDeUso";
import Servico from "../model/Servico";



export default class BuscarServicos implements CasoDeUso<void, Servico[] > {
    
    constructor(
        private readonly repo: RepositorioServico,
        
    ){}

    async executar(): Promise<Servico[]> {
        return await this.repo.buscarTodos();
    }
    
}