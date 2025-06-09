'use client'
import FormulárioAgendamento from "@/components/agendamento/FormularioAgendamento"
import Cabecalho from "@/components/shared/Cabecalho"
import CabecalhoComTitulo from "@/components/shared/CabecalhoComTitulo"
import useAPI from "@/data/hooks/useAPI"


export default function Page() {

    return (
        <div className="flex flex-col gap-5 bg-black text-white ">
            <CabecalhoComTitulo titulo='Agendamento de Serviços' descricao="Seja atendido exatamente no horário marcado." />
            <div className="container py-10">
                <span className="text-5xl text-white">Formulário Agendamento</span>
                <FormulárioAgendamento />
            </div>
        </div>
    )
}