import { Injectable } from '@nestjs/common';
import { RepositorioServico, Servico } from '@slo/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ServicoPrisma implements RepositorioServico {
    constructor( private readonly prisma: PrismaService){}

    buscarTodos(): Promise<Servico[]> {
        return this.prisma.servico.findMany();
    }
}
