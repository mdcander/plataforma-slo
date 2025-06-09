import useServicos from "@/data/hooks/useServicos";
import { Servico } from "@slo/core";

export interface CampoServicosProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> {
    label?: string
    value: Servico[]
    onChange: (value: Servico[]) => void
}

export default function CampoServicos(props: CampoServicosProps ){
    
    const { servicos } = useServicos()

    function onChange(e: React.ChangeEvent<HTMLInputElement>, servico: Servico){
        const novosValores = props.value.filter( s => s.id != servico.id)
        props.onChange(e.target.checked ? [...novosValores, servico] : novosValores)
        
    }

    return servicos ? (
        <div className="flex flex-col">
            { props.label && <span>{props.label}</span> }
            <div className="grid grid-cols-3 gap-7">
                {servicos.map( servico => {
                    return  (
                        <div key={servico.id} className="flex items-center gap-2">
                            <input  type="checkbox" 
                                checked={!!props.value.find((v) => v.id === servico.id)}
                                onChange={e => onChange(e, servico) } 
                            />
                            <span>{servico.nome}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    ) : null
}