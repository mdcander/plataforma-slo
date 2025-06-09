import useAPI from "@/data/hooks/useAPI";
import { useEffect, useState } from "react";
import useSessao from "./useSessao";
import { useRouter, useSearchParams } from "next/navigation";

export default function useFormAuth() {

        const [nome, setNome] = useState('')
        const [email, setEmail] = useState('')
        const [senha, setSenha] = useState('')
        const [telefone, setTelefone] = useState('')
        const [modo, setModo] = useState<"login" | 'cadastro'>('login')

    
        const { httpPost } = useAPI()
        const { usuario, iniciarSessao } = useSessao()
        const router = useRouter()
        const param = useSearchParams()

        useEffect(() =>{
            if(usuario?.email){
                const destino = param.get('redirect') as string
                router.push(destino ? destino : '/')

            }
        }, [usuario, router, param])
    
        async function submeter() {
            if (modo === 'login') {
                await login()
            } else {
                await registrar()
                await login()
            }
            limparFormulario()
        }

        async function login() {
                const token = await httpPost('/auth/login', { email, senha } )
                iniciarSessao(token)  
        }
        
        async function registrar() {
            const respo = await httpPost('/auth/registrar', { nome, email, senha, telefone } )
            console.log(respo)
        }
    
         function limparFormulario() {
                setNome('')
                setEmail('')
                setSenha('')
                setTelefone('')
        }

        function alternarModo() {
            limparFormulario()
            setModo(modo === 'login' ? 'cadastro' : 'login')
        }

        return {
            modo,
            nome,
            email,
            senha,
            telefone,
            alternarModo,
            alterarNome: setNome,
            alterarEmail: setEmail,
            alterarSenha: setSenha,
            alterarTelefone: setTelefone,
            submeter,
        }
}