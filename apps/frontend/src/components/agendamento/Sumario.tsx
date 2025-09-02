import useAgendamento from "@/data/hooks/useAgendamento";
import { MoedaUtils, Profissional, Servico, servicos } from "@slo/core";
import { IconCalendar } from "@tabler/icons-react";

export default function Sumario(){

    const { profissional, servicos, duracaoTotal, dataValida, podeAgendar, agendar} = useAgendamento()

    return(
        <div className="flex flex-col bg-zinc-800 w-96 rounded-l-lg">
            <CabecalhoDoSumario />
            <div className="flex flex-col p-5 gap-6">
                <SumarioProfissional profissional={profissional}/>
                <SumarioServicos servicos={servicos}/>
                <DuracaoTotal duracao={duracaoTotal()}/>
                <SumarioData data={dataValida} />
            </div>
            <SumarioValorTotal valor={0}/>
            <div className="p-5">
                <button 
                    onClick={agendar}
                    disabled={!podeAgendar()}
                    className={`
                        button w-full bg-yellow-400
                        ${!podeAgendar() ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                    `} >
                    Finalizar Agendamento
                </button>
            </div>
        </div>

    )
}

function CabecalhoDoSumario(){
    return(
        <div className="flex items-center gap-2 p-4 border-b border-zinc-700">
            <div className="flex justify-center items-center bg-zinc-600 rounded-full h-9 w-9">
                <IconCalendar size={20} stroke={1}/>
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-zinc-300 ">Sumário do Agendamento</span>
                <span className="font-xs text-zinc-500 leading-3">Será um prazer atendê-lo!</span>
            </div>
        </div>
    )
}

function SumarioProfissional(props: {profissional: Profissional | null}){
    return(
        <div className="flex flex-col gap-3">
            <span className="text-xs uppercase text-zinc-300">Profissional:</span>
            <span>{props.profissional ? props.profissional.nome : 'Não selecionado'}</span>
        </div>
    )
}

function SumarioServicos(props: { servicos: Servico[]}){
    
    function rederizarServico(servico: Servico, i: number){
        return(
            <div key={servico.id} className="flex items-center bg-zinc-600 rounded-md ">
                <span className= "px-3 bg-black/25 py-1.5">{i}</span>
                <span className="font-light px-3">{servico.nome}</span>
            </div>
        )
    }

    return(
        <div className="flex flex-col gap-3">
            <span className="text-xs uppercase text-zinc-300">Serviços:</span>
            <span className="flex gap-2 flex-wrap text-sm text-white">
                {props.servicos.length === 0 ? 'Nenhum servico selecionado' : ''}
                {props.servicos.map((s, i) => rederizarServico(s, i + 1))}
            </span>
        </div>
    )
}

function DuracaoTotal(props: { duracao: string} ){
    return(
        <div className="flex flex-col gap-3">
            <span className="text-xs uppercase text-zinc-300">Duracao</span> 
            <span className="font-light">{props.duracao}</span> 
        </div>
    )
}

function SumarioData(props: { data: Date | null} ){
    return(
        <div className="flex flex-col gap-3">
            <span className="text-xs uppercase text-zinc-300">Horário</span> 
            <span className="font-light">
                {props.data ? props.data?.toLocaleDateString('pt-BR', {dateStyle: 'long'}) : 'Não selecionado'}
                {' às '}
                {props.data?.toLocaleTimeString('pt-BR').substring(0,5)}
            </span> 
        </div>
    )
}

function SumarioValorTotal(props: { valor: number } ){
    return(
        <div className="flex justify-between gap-3 items-center border-y border-zinc-700 px-5 py-7 ">
            <span className="text-xs uppercase text-zinc-300">Valor Total</span> 
            <span className="font-light">{MoedaUtils.formatar(props.valor)}</span> 
        </div>
    )
}