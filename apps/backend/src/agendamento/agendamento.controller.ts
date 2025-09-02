import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Agendamento, BuscarAgendamentosCliente, BuscarAgendaProfissionalPorDia, ExcluirAgendamento, NovoAgendamento, ObterHorariosOcupados, Usuario } from '@slo/core';
import { UsuarioLogado } from 'src/shared/usuario.decorator';
import { AgendamentoPrisma } from './agendamento.prisma';

@Controller('agendamentos')
export class AgendamentoController {

    constructor(private readonly repo: AgendamentoPrisma){}

    @Post()
    async novoAgendamento(@Body() dadosAgendamento: Agendamento, @UsuarioLogado() usuario: Usuario){
        const agendamento: Agendamento = { ...dadosAgendamento, data: new Date( dadosAgendamento.data)}
        const CasoDeUso = new NovoAgendamento(this.repo);
        await CasoDeUso.executar( { agendamento, usuario });
    }

    @Get('ocupacao/:profissional/:data')
    buscarOcupacaoPorProfissionalEData(
    @Param('profissional') profissional: string,
    @Param('data') dataParam: string,
    ) {
            const casoDeUso = new ObterHorariosOcupados(this.repo);
            return casoDeUso.executar({ profissionalId: +profissional, data: new Date(dataParam),
        });
    }

    @Get()
    buscarAgendamentosCliente(@UsuarioLogado() usuario: Usuario){
        const CasoDeUso = new BuscarAgendamentosCliente(this.repo);
        return CasoDeUso.executar(usuario);
    }

    @Get(':profissional/:data')
    buscarAgendaProfissionalPorDia(@Param('profissional') profissional: string, @Param('data') data: string){
        const casoDeUso = new BuscarAgendaProfissionalPorDia(this.repo);
        return casoDeUso.executar({
            profissional: +profissional,
            data: new Date(data),
        });
    }

    @Delete(':id')
    excluirAgendamento(@Param('id') id: string, @UsuarioLogado() usuario: Usuario){
        const casoDeUso = new ExcluirAgendamento(this.repo);
        casoDeUso.executar( {  id: +id, usuario });

    }

    @Get()
    teste(@UsuarioLogado() usuario: Usuario) {
        return `Agendamento para ${usuario.nome}`;
    }

}
