'use client'
import FormulárioAgendamento from "@/components/agendamento/FormularioAgendamento"
import CabecalhoComTitulo from "@/components/shared/CabecalhoComTitulo"



export default function Page() {

    return (
        <div className="flex flex-col gap-5 bg-black text-white ">
            <CabecalhoComTitulo titulo='Agendamento' descricao="Seja atendido no horário marcado." />
            <div className="container py-10">
                <FormulárioAgendamento />
            </div>
        </div>
    )
}