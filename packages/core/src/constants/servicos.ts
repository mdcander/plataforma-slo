import { Servico } from '@slo/core'

export const servicos: Servico[] = [
    {
        id: 1,
        nome: 'Consulta',
        descricao: 'Consulta com o Doutor especialista.',
        qtdSlots: 2,
    },
    {
        id: 2,
        nome: 'Consulta ao administrativo',
        descricao: 'Consulta ao nosso setor administrativo.',
        qtdSlots: 1,
    },
] 