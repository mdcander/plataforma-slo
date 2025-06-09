
export interface TituloProps {
    tag?: string
    principal: string
    secundario?: string
}

export default function TituloSecao(props: TituloProps) {
    return(
        <div className="flex flex-col items-center ">
            {props.tag && 
                <div className="bg-zinc-600 px-4 py-1.5 text-sm md:text-base rounded-md font-black mb-2">
                    {props.tag}
                </div>}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gradient py-2">
                {props.principal}
            </h2>
            {props.secundario && 
                <h3 className="text-zinc-500 md:w-[450px] px-7 md:px-0 text-center py-1.5">{props.secundario}
            </h3>}
        </div>
    )

}