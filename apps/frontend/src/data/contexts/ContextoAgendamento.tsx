'use client'
import { createContext, useState } from "react";
import useAPI from "../hooks/useAPI";
import useSessao from "../hooks/useSessao";
import { Profissional, Servico } from "@slo/core";

export interface ContextoAgendamentoProps {
    profissional: Profissional | null
    servicos: Servico[]
    data: Date | null
    agendar: () => Promise<void>
    selecionarProfissional: (profissional: Profissional | null) => void
    selecionarServicos: (servicos: Servico[]) => void
    selecionarData: (data: Date | null) => void
}

const ContextoAgendamento = createContext<ContextoAgendamentoProps>({} as any) ;

export function ProvedorAgendamento(props: any){
    const { httpPost } = useAPI()
    const { usuario } = useSessao()
    const [ profissional, setProfissional ] = useState<Profissional | null>(null)
    const [ servicos, setServicos ] = useState<Servico[]>([])
    const [ data, setData ] = useState<Date | null>(null)

    async function agendar() {
        await httpPost('/agendamentos', {
            data,
            usuario,
            profissional,
            servicos,
        })
    }
    return(
        <ContextoAgendamento.Provider value={{
            profissional,
            servicos,
            data,
            selecionarProfissional: setProfissional,
            selecionarServicos: setServicos,
            selecionarData: setData,
            agendar,
        }}>
            {props.children}
        </ContextoAgendamento.Provider>
    )
}

export default ContextoAgendamento