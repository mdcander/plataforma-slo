import ForcarAutenticacao from "@/components/shared/ForcarAutenticacao";
import Pagina from "@/components/shared/Pagina";
import { ProvedorAgendamento } from "@/data/contexts/ContextoAgendamento";

export default function Layout(props: any) {
    return (
            <ProvedorAgendamento>
                {props.children}            
            </ProvedorAgendamento>
    )    
}