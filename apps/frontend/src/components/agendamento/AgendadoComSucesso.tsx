import Image from "next/image";
import Link from "next/link";

export default function AgendadoComSucesso(){
    return (
        <div className="flex flex-col items-center bg-black p-10">
            <Image className="items-center" src='/banners/agendamento.png' width={400} height={400} alt="Agendamento com Sucesso" />
            <Link className="button mt-7 mb-7 bg-green-600" href="/">Voltar para o Início</Link>
        </div>
    )
}