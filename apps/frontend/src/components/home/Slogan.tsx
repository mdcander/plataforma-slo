import Image from "next/image";
import Cabecalho from "../shared/Cabecalho";
import Link from "next/link";


export default function Slogan () {
    return (
        <div className="relative h-[300px] sm:h-[500px]">
            <Image src="/banners/fundo.webp" fill alt="Barbearia" className="object-cover object-left" />
            <div
                className="
                    flex flex-col items-center
                    absolute top-0 left-0 w-full h-full
                    bg-black/85
                "
            >
                <Cabecalho />
                <div className="flex flex-col justify-center items-center flex-1 gap-5">
                    <h1 className="flex flex-col items-center">
                        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gradient">
                            Agendamento
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg font-extralight text-zinc-400">
                        Agende sua consulta
                    </p>
                    <Link
                        href="/internas/agendamento"
                        className="
                            bg-gradient-to-r from-green-500 to-green-600
                            text-white font-semibold text-base md:text-lg
                            px-4 py-2 rounded-sm hover:from-green-600 hover:to-green-700 
                        "
                    >
                        Agendar Agora
                    </Link>
                </div>
            </div>
        </div>
    )
}