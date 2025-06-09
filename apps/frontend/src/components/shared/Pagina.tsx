import { Anybody } from "next/font/google";
import Rodape from "./Rodape";

export interface PaginaProps {
    children: any
    classname?: String
}

export default function Pagina(props: any) {
    return (
        <div className="flex flex-col min-h-screen w-screen">
            <main className={props.className ?? ''}>{props.children}</main>
            <Rodape />
        </div>
    )
}