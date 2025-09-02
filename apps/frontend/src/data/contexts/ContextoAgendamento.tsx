'use client'
import { createContext, useCallback, useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import useSessao from "../hooks/useSessao";
import { AgendaUtils, DateUtils, Profissional, Servico } from "@slo/core";
import { useRouter } from "next/navigation";

export interface ContextoAgendamentoProps {
    profissional: Profissional | null
    servicos: Servico[]
    data: Date | null
    dataValida: Date | null
    horariosOcupados: string[]
    selecionarProfissional: (profissional: Profissional | null) => void
    selecionarServicos: (servicos: Servico[]) => void
    selecionarData: (data: Date | null) => void
    agendar: () => Promise<void>
    podeAgendar: () => boolean
    duracaoTotal: () => string
    qtdeHorarios: () => number
}

const ContextoAgendamento = createContext<ContextoAgendamentoProps>({} as any) ;

export function ProvedorAgendamento(props: any){
    const { httpPost, httpGet } = useAPI()
    const { usuario } = useSessao()
    const router = useRouter()

    const [horariosOcupados, setHorariosOcupados] = useState<string[]>([])
    const [ profissional, setProfissional ] = useState<Profissional | null>(null)
    const [ servicos, setServicos ] = useState<Servico[]>([])
    const [ data, setData ] = useState<Date | null>(null)

    function podeAgendar(): boolean{
        if(!profissional) return false
        if(servicos.length === 0) return false
        if(!data) return false
        return data.getHours() >= 8 && data.getHours() <= 19
    }

    function duracaoTotal(){
        return AgendaUtils.duracaoTotal(servicos)
    }
    
    function qtdeHorarios() {
        return servicos.reduce((qtde, servico) => qtde + servico.qtdSlots, 0)
    }

    async function agendar() {
        await httpPost('/agendamentos', {
            data,
            usuario,
            profissional,
            servicos,
        })

        router.push('/internas/agendamento/sucesso')
        limpar()
    }

    function limpar(){
        setProfissional(null)
        setServicos([])
        setData(DateUtils.hojeComHoraZerada())
    }

    const obterHorariosOcupados = useCallback(
        async function (dia: Date, profissional: Profissional): Promise<string[]> {
            if (!dia || !profissional) return []
            const ocupacao = await httpGet(`agendamentos/ocupacao/${profissional!.id}/${dia}`)
            return ocupacao ?? []
        },
        [httpGet]
    )

    useEffect(() => {
        if (!data || !profissional) return
        obterHorariosOcupados(data, profissional).then(setHorariosOcupados)
    }, [data, profissional, obterHorariosOcupados])

    // function total(){
    //     return servicos.reduce( (acc, servico ) => acc + servico., 0)
    // }
    
    return(
        <ContextoAgendamento.Provider value={{
            profissional,
            servicos,
            data,
            horariosOcupados,
            get dataValida() {
                if(!data) return null
                if(data.getHours() < 8 || data.getHours() > 18) return null
                return data
            },
            selecionarProfissional: setProfissional,
            selecionarServicos: setServicos,
            selecionarData: setData,
            agendar,
            podeAgendar,
            duracaoTotal,
            qtdeHorarios,
        }}>
            {props.children}
        </ContextoAgendamento.Provider>
    )
}

export default ContextoAgendamento