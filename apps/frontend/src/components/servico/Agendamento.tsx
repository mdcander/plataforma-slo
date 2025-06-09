import Link from "next/link";
import TituloSecao from "../shared/TituloSecao";

export default function Agendamento() {
    return(
        <div className="flex flex-col gap-5 h-80">
            <TituloSecao principal="Agendamento" secundario="Faça agendamento da consulta pelo nosso sistema"></TituloSecao>
            <div className="flex flex-col justify-center items-center  gap-5">
                    <Link href="https://api.whatsapp.com/send?phone=5515991376767&text=Olá Phasys, Venho da página inicial e gostaria de tirar algumas dúvidas. *Meu nome é:*" className=" justify-center
                        bg-gradient-to-r from-green-500 to-green-600
                        text-white font-semibold text-base md:text-lg
                        px-4 py-2 rounded-sm hover:from-green-600  hover:to-green-600
                    "
                    target="_blank">
                        Agendar
                    </Link>
            </div>
        </div>
    )
}