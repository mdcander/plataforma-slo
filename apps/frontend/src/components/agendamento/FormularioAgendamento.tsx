import CampoServicos from "../servico/CampoServicos";
import CampoProfissional from "../profissional/CampoProfissional";
import CampoDataHora from "../shared/formulario/CampoDataHora";
import useAgendamento from "@/data/hooks/useAgendamento";

export default function FormulárioAgendamento(){
    const {
        profissional,
        servicos,
        data,
        selecionarProfissional,
        selecionarServicos,
        selecionarData,
        agendar,
    } = useAgendamento()

    return (
        <div className="flex flex-col gap-5">
            <CampoProfissional className="input" label="Profissional" value={ profissional } onChange={selecionarProfissional}></CampoProfissional>
            <CampoServicos
                className="input"
                label="Serviços"
                value={servicos}
                onChange={selecionarServicos}
            ></CampoServicos>
            <CampoDataHora label="Data e Hora" value={data} onChange={selecionarData} className="input" apenasNoFuturo={true} />
            <div>
            <button className="button bg-blue-600" onClick={agendar}>
                Agendar
            </button>
        </div>
        </div>
        
    )
}