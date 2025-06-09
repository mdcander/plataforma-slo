import { PrismaClient } from "@prisma/client";
import { profissionais, servicos, Usuario } from "@slo/core";

const prisma = new PrismaClient();

async function seed() {
   
    await prisma.profissional.deleteMany();
    await prisma.profissional.createMany({
        data: profissionais as any,
    })

    await prisma.servico.deleteMany();
    await prisma.servico.createMany({
        data: servicos as any,
    })

    const usuarios: Usuario[] = [
        {
            nome: 'Ander Carvalho',
            email: 'ander@mail.com',
            senha: '$2b$10$aFYloo.VVkxsQOvGUee1GukQ.EnIsEoaWsg59At9wg9skFP1KVDci',
            telefone: '(15) 365212324',
            celular: '(15) 365212324',
            cnpj_cpf: '27398744860',
            administrador: true
        },
        {
            nome: 'José Pacheco',
            email: 'pacheco@mail.com',
            senha: '$2b$10$aFYloo.VVkxsQOvGUee1GukQ.EnIsEoaWsg59At9wg9skFP1KVDci',
            telefone: '(11) 365212324',
            celular: '(11) 365212324',
            cnpj_cpf: '28398744860',
            administrador: false
        },
    ];
    await prisma.usuario.deleteMany();
    await prisma.usuario.createMany({ data: usuarios as any})

}

seed();