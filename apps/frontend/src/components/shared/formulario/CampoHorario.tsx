import { AgendaUtils, DateUtils } from "@slo/core";

export interface CampoHorarioProps extends Omit<React.SelectHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  label?: string;
  value: Date;
  onChange: (value: Date) => void;
}

export default function CampoHorario(props: CampoHorarioProps) {
  
  const { manha, tarde} = AgendaUtils.horariosDoDia()

  function renderizaHorario(horario: string){
    return (
      <div className="flex justify-center items-center bg-zinc-800 h-8">
        <span>{horario}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {props.label && (
        <span className="uppercase text-zinc-400 font-light">{props.label}</span>
      )}
      <div className="flex flex-col">
        <span className="uppercase text-zinc-400 font-light">Manhã</span>
          <div className="grid grid-cols-8 gap-1">{ manha.map(renderizaHorario) }</div>
        <span className="uppercase text-zinc-400 font-light">Tarde</span>
          <div className="grid grid-cols-8 gap-1">{ tarde.map(renderizaHorario) }</div>
      </div>
    </div>
  )
}
