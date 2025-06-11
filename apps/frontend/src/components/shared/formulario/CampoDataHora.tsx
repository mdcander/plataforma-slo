


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
  
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange( new Date(`${e.target.value}:00Z`))
  }

  // YYYY-MM--DDTHH:MM
  return (
    <div className="flex flex-col">
      {props.label && <span>{props.label}</span>}
      <input 
        {...props } 
        type="datetime-local" 
        value={props.value?.toISOString().substring(0, 16) ?? ''} 
        onChange={onChange} 
        min={props.apenasNoFuturo ? new Date().toISOString().substring(0, 16) : undefined}
      />
    </div>
  )
}
