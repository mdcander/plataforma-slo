import { Controller, Get } from '@nestjs/common';
import { BuscarServicos } from '@slo/core';
import { ServicoPrisma } from './servico.prisma';

@Controller('servicos')
export class ServicoController {
    constructor( private readonly repo: ServicoPrisma ){}

    @Get()
    obterServicos(){
        const casoDeUso = new BuscarServicos(this.repo);
        return casoDeUso.executar();
    }
}
