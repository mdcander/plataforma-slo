'use client'
import { cn } from "@/lib/utils";
import { AgendaUtils, DateUtils } from "@slo/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

export interface CampoHorarioProps extends Omit<React.SelectHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  label?: string;
  value: Date;
  qtdeHorarios: number;
  horariosOcupados: string[];
  onChange: (value: Date) => void;
}

export default function CampoHorario(props: CampoHorarioProps) {

  const [horarioHover, setHorarioHover] = useState<string | null>(null);
  const { manha, tarde} = AgendaUtils.horariosDoDia()
  const { horariosOcupados } = props

  const horarioSelecionado = props.value.toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' })

  function obterIntervaloDeHorarios(horario: string | null, qtde: number){
    if(!horario) return []
    const horarios = manha.includes(horario) ? manha : tarde;
    const indice = horarios.indexOf(horario)
    return horarios.slice(indice, indice + qtde)
  }

  function renderizaHorario(horario: string){
    const intervaloHover = obterIntervaloDeHorarios(horarioHover, props.qtdeHorarios);
    const destaque = intervaloHover.includes(horario)
    const horariosSuficientes = intervaloHover.length === props.qtdeHorarios
    const naoSelecionavel = horarioHover && !horariosSuficientes && intervaloHover.includes(horario)

    // const naoPodeSelecionar = destaque && (horariosHover.ocupado || horariosHover.incompleto)

    const intervaloSelecionado = obterIntervaloDeHorarios(
      horarioSelecionado,
      props.qtdeHorarios
    )

    const selecionado = intervaloSelecionado.length === props.qtdeHorarios && intervaloSelecionado.includes(horario)

    const intervaloHoverOcupado = intervaloHover.includes(horario) && intervaloHover.some((h) => horariosOcupados.includes(h))
    const horarioOcupado = horariosOcupados.includes(horario)


    return (
      <div 
        className={
          cn('flex justify-center items-center rounded h-8 bg-zinc-800', 
              {
                'bg-green-500 text-white font-semibold ':  selecionado,
                'bg-yellow-400 text-black font-semibold': destaque, 
                'bg-red-500 text-white font-semibold cursor-not-allowed':  naoSelecionavel || intervaloHoverOcupado,
              }
           )
        }
        onMouseEnter={() => setHorarioHover(horario)}
        onMouseLeave={() => setHorarioHover(null)}
        onClick={() => {
          if(naoSelecionavel || intervaloHoverOcupado) return
          props.onChange(DateUtils.aplicarHorario(props.value, horario))
        }}
        >
          { naoSelecionavel || horarioOcupado ? ( <IconX size={18}/> ) : ( <span>{horario}</span> ) }
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 select-none">
      {props.label && (
        <span className="uppercase text-zinc-400 font-light">{props.label}</span>
      )}
      <div className="flex flex-col gap-3">
        <span className="uppercase text-zinc-400 font-light">Manhã</span>
          <div className="grid grid-cols-8 gap-1">{ manha.map(renderizaHorario) }</div>
        <span className="uppercase text-zinc-400 font-light">Tarde</span>
          <div className="grid grid-cols-8 gap-1">{ tarde.map(renderizaHorario) }</div>
      </div>
    </div>
  )
}



// 'use client'
// import { cn } from '@/lib/utils'
// import { AgendaUtils, DateUtils, Horarios } from '@slo/core'
// import { IconX } from '@tabler/icons-react'
// import { useState } from 'react'


// export interface CampoHorarioProps
//     extends Omit<React.SelectHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
//     label?: string
//     value: Date
//     qtdeHorarios: number
//     horariosOcupados: string[]
//     onChange: (value: Date) => void
// }

// export default function CampoHorario(props: CampoHorarioProps) {
//     const [horarioHover, setHorarioHover] = useState<string | null>(null)
//     const { manha, tarde } = AgendaUtils.horariosDoDia()
//     const { horariosOcupados } = props

//     const horarioSelecionado = props.value.toLocaleTimeString('pt-BR', {
//         hour: '2-digit',
//         minute: '2-digit',
//     })

//     function renderizarHorario(horario: string) {
//         const horariosHover = new Horarios(horarioHover!, props.qtdeHorarios, horariosOcupados)
//         const horariosSelecionados =  new Horarios(horarioSelecionado,
//             props.qtdeHorarios,
//             horariosOcupados)
//         const selecionado =
//             horariosSelecionados.todos.includes(horario) && horariosSelecionados.completo
//         const destaque = horariosHover.todos.includes(horario)
//         const naoPodeSelecionar = destaque && (horariosHover.ocupado || horariosHover.incompleto)

//         return (
//             <div
//                 className={cn('flex justify-center items-center rounded h-8 bg-zinc-800', {
//                     'bg-green-500 text-white font-semibold': selecionado,
//                     'bg-yellow-400 text-black font-semibold': destaque,
//                     'bg-red-500 text-white font-semibold cursor-not-allowed': naoPodeSelecionar,
//                 })}
//                 onMouseEnter={() => setHorarioHover(horario)}
//                 onMouseLeave={() => setHorarioHover(null)}
//                 onClick={() => {
//                     if (naoPodeSelecionar) return
//                     props.onChange(DateUtils.aplicarHorario(props.value, horario))
//                 }}
//             >
//                 {horariosOcupados.includes(horario) ? <IconX size={18} /> : <span>{horario}</span>}
//             </div>
//         )
//     }

//     return (
//         <div className="flex flex-col gap-3 select-none">
//             {props.label && (
//                 <span className="uppercase text-zinc-400 font-light">{props.label}</span>
//             )}
//             <div className="flex flex-col gap-3">
//                 <span className="uppercase text-zinc-400 font-light">Manhã</span>
//                 <div className="grid grid-cols-8 gap-1">{manha.map(renderizarHorario)}</div>

//                 <span className="uppercase text-zinc-400 font-light">Tarde & Noite</span>
//                 <div className="grid grid-cols-8 gap-1">{tarde.map(renderizarHorario)}</div>
//             </div>
//         </div>
//     )
// }
