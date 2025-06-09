import Image from 'next/image'
import Logo from '../shared/Logo'
export default function Processando() {
    return (
        <div className="text-white h-screen">
            <Image src="/banners/fundo.webp" fill alt="Fundo" />
            <div
                className="
                flex flex-col justify-center items-center
                absolute top-0 left-0 w-full h-full
                bg-black/80 gap-2
                ">

                <Logo />
                <span className='font-light text-zinc-500 ml-4'>Processando...</span>
            </div>
        </div>
    )
}