import Image from "next/image";
import React from "react";

export interface SecaoBackgroundProps {
    children: React.ReactNode
    imagem: string
}

export default function SecaoBackground(props: SecaoBackgroundProps) {
    return(
        <div className="relative ">
            <Image src={props.imagem} alt="Imagem de fundo" fill className="object-cover -z-30 px-1 object-bottom"/>
            <div className="bg-black/80 sm:bg-transparent sm:bg bg-gradient-to-r from-black/50 via-black/70 to-black/50">
                <div className="container py-10">{props.children}</div>
            </div>
        </div>
    )
}