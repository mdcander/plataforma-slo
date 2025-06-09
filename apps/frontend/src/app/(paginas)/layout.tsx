import { ProvedorSessao } from "@/data/contexts/ContextoSessao";

export default function Layout(props: any) {
    return <ProvedorSessao><div>{props.children}</div></ProvedorSessao> 
}