import { DateUtils } from "@slo/core";
import CampoDia from "./CampoDia";
import CampoHorario from "./CampoHorario";

export interface CampoDataHoraProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  label?: string;
  value: Date | null;
  apenasNoFuturo?: Boolean;
  onChange: (value: Date | null) => void;
}

export default function CampoDataHora(props: CampoDataHoraProps) {
  const data = props.value ?? DateUtils.hojeComHoraZerada();
  return (
    <div className="flex flex-col gap-6">
      <CampoDia label="Dias Disponíveis" value={data} onChange={props.onChange} />
      <CampoHorario label="Horário Disponíveis" value={data} onChange={props.onChange} />
    </div>
  )
}
