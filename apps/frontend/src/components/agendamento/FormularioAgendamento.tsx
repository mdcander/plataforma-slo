import CampoServicos from "../servico/CampoServicos";
import CampoProfissional from "../profissional/CampoProfissional";
import CampoDataHora from "../shared/formulario/CampoDataHora";
import useAgendamento from "@/data/hooks/useAgendamento";
import Passos from "../shared/Passos";

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
            <Passos 
                labels={['Selecione o Profissional', 'Selecione os Serviços', 'Escolha o Horário']}
                permiteProximoPasso={[
                    !!profissional,
                    servicos.length > 0,
                    !!data
                ]}
                acao={agendar} 
                labelAcao="Agendar"
                >
                <CampoProfissional className="input" label="Profissional" value={ profissional } onChange={selecionarProfissional}></CampoProfissional>
                <CampoServicos
                    className="input"
                    label="Serviços"
                    value={servicos}
                    onChange={selecionarServicos}
                ></CampoServicos>
                <CampoDataHora label="Data e Hora" value={data} onChange={selecionarData} className="input" apenasNoFuturo={true} />
            </Passos>
            <div>
                <button className="button bg-blue-600" onClick={agendar}>
                    Agendar
                </button>
            </div>
        </div>
        
    )
}