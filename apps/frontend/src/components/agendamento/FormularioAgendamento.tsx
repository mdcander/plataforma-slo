import CampoServicos from "../servico/CampoServicos";
import CampoProfissional from "../profissional/CampoProfissional";
import CampoDataHora from "../shared/formulario/CampoDataHora";
import useAgendamento from "@/data/hooks/useAgendamento";
import Passos from "../shared/Passos";
import Sumario from "./Sumario";

export default function FormulárioAgendamento(){
    const {
        profissional,
        servicos,
        data,
        horariosOcupados,
        selecionarProfissional,
        selecionarServicos,
        selecionarData,
        agendar,
        podeAgendar,
        qtdeHorarios,
    } = useAgendamento()

    return (
        <div className="flex gap-5">
            <Passos 
                labels={['Selecione o Profissional', 'Selecione os Serviços', 'Escolha o Horário']}
                permiteProximoPasso={[
                    !!profissional,
                    servicos.length > 0,
                    podeAgendar()
                ]}
                acao={agendar} 
                labelAcao="Agendar"
                >
                <CampoProfissional className="input" label="Selecione os Profissionais" value={ profissional } onChange={selecionarProfissional}></CampoProfissional>
                <CampoServicos
                    className="input"
                    label="Serviços"
                    value={servicos}
                    onChange={selecionarServicos}
                ></CampoServicos>
                <CampoDataHora label="Data e Hora" value={data} onChange={selecionarData} horariosOcupados={horariosOcupados} className="input" apenasNoFuturo={true} qtdeHorarios={qtdeHorarios()} />
            </Passos>
            <Sumario />
        </div>
        
    )
}