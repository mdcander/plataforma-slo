import { IconEye, IconEyeOff } from "@tabler/icons-react"
import { useState } from "react"

export interface CampoSenhaProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChangeText?: (s: string) => void
}

export default function CampoSenha(props: CampoSenhaProps) {

    const [mostrarSenha, setMostrarSenha] = useState(false)
     
    function alternarMostrarSenha() {
        setMostrarSenha(!mostrarSenha)
    }

    return(

         <div className="flex input-form items-center bg-zinc-700">
            <input 
                type={mostrarSenha ? 'text' : 'password'}
                value={props.value} 
                onChange={(e) => {
                    props.onChange?.(e) 
                    props.onChangeText?.(e.target.value)
                }} 
                placeholder={props.placeholder}
                className="flex-1 input-form bg-transparent outline-none"
            />
            {mostrarSenha ? (
                <IconEyeOff onClick={alternarMostrarSenha} className="text-zinc-400 cursor-pointer " />
            ) : (
                <IconEye onClick={alternarMostrarSenha} className="text-zinc-400 cursor-pointer " />
            )}
        </div>
    )
}