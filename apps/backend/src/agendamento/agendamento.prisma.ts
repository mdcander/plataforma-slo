import { Injectable } from '@nestjs/common';
import { RepositorioAgendamento, Agendamento, servicos } from '@slo/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AgendamentoPrisma implements RepositorioAgendamento {
    constructor( private readonly prisma: PrismaService){}

    async criar(agendamento: Agendamento): Promise<void> {
        console.log(agendamento)
        await this.prisma.agendamento.create({
            data: {
                data: agendamento.data,
                usuario: {connect: {id: agendamento.usuario.id}},
                profissional: { connect: { id: agendamento.profissional.id } },
                servicos: {
                    connect: agendamento.servicos.map(( servico ) => ( { id: servico.id } ))
                }
            },
        })
    }

    buscarPorId(id: number): Promise<Agendamento | null> {
        return this.prisma.agendamento.findUnique({
            where: { id },
            include: {
                usuario: { select: { id: true, nome: true, email: true} },
                profissional: { select: { id: true, nome: true } },
                servicos: { select: { id: true, nome: true, qtdSlots: true } },
            },
        });
    }

    async buscarPorEmail(email: string): Promise<Agendamento[]> {
        const agendamentos= await  this.prisma.agendamento.findMany({
            where: { usuario: { email }, data: { gte: new Date() } },
            include: {
                usuario: { select: { id: true, nome: true, email: true} },
                profissional: { select: { id: true, nome: true } },
                servicos: { select: { id: true, nome: true, qtdSlots: true } },
            },
            orderBy: { data: 'desc' }
        });
       
        return agendamentos.map((agendamento) => {
            const { usuarioId, profissionalId, ...rest } = agendamento as any;
            return rest;
        });
        
    }

    buscarPorProfissionalEData(profissional: number, data: Date): Promise<Agendamento[]> {
        const ano = data.getFullYear();
        const mes = data.getUTCMonth();
        const dia = data.getUTCDate();
        const inicioDia = new Date(ano, mes, dia, 0, 0, 0);
        const fimDia = new Date(ano, mes, dia, 23, 59, 59);

        return this.prisma.agendamento.findMany({
            where: {
                profissionalId: profissional,
                data: { gte: inicioDia, lte: fimDia }
            },
            include: {
                 usuario: { select: { id: true, nome: true, email: true} },
                profissional: { select: { id: true, nome: true } },
                servicos: { select: { id: true, nome: true, qtdSlots: true } },
            }
        })
    }

     async excluir(id: number): Promise<void> {
        await this.prisma.agendamento.delete({
            where: { id },
            include: { servicos: true },
        });
    }

}
