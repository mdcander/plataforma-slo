import useProfissionais from "@/data/hooks/useProfissionais";
import { Profissional } from "@slo/core";

export interface CampoProfissionalProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "value" | "onChange"
  > {
  label?: string;
  value: Profissional | null;
  onChange: (value: Profissional) => void;
}

export default function CampoProfissional(props: CampoProfissionalProps) {
  const { profissionais } = useProfissionais();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = +e.target.value;
    const profissional = profissionais.find(
      (profissional) => profissional.id === id
    );
    if (profissional) {
      props.onChange(profissional);
    }
  }

  return profissionais ? (
    <div className="flex flex-col">
      {props.label && <span>{props.label}</span>}
      <select
        {...props}
        value={props.value?.id ?? profissionais[0].id}
        onChange={onChange}
      >
        {profissionais.map((profissional) => {
          return (
            <option key={profissional.id} value={profissional.id}>
              {profissional.nome}
            </option>
          );
        })}
      </select>
    </div>
  ) : null;
}
