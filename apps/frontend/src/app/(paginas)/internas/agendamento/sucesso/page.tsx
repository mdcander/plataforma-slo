'use client'
import AgendadoComSucesso from "@/components/agendamento/AgendadoComSucesso";
import CabecalhoComTitulo from "@/components/shared/CabecalhoComTitulo";

export default function Page(){
    return (
        <div className="flex flex-col bg-black"> 
            <CabecalhoComTitulo titulo='Agendamento de Consultas' descricao='Confirmação de agendamento' />
            <div className="container flex flex-col">
                <AgendadoComSucesso />
            </div>
        </div>
    )
}