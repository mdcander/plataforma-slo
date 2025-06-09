'use client'
import { Usuario } from "@slo/core";
import { createContext, useCallback, useEffect, useState } from "react";
import cookie from 'js-cookie'
import { jwtDecode } from "jwt-decode";

interface Sessao {
    token: string | null
    usuario: Usuario | null
}

interface ContextoSessaoProps {
    carregando: boolean
    token: string | null
    usuario: Usuario | null
    iniciarSessao: (token: string) => void
    encerrarSessao: () => void
}

const ContextoSessao = createContext<ContextoSessaoProps>({} as any)
export default ContextoSessao

export function ProvedorSessao(props: any) {

    const nomeCookie = '_slo_token'

    const [carregando, setCarregando] = useState(true)
    const [sessao, setSessao] = useState<Sessao>({ token: null, usuario: null})
    
    function iniciarSessao(token: string) {
        cookie.set(nomeCookie, token, { expires: 1})
        const sessao= obterSessao()
        setSessao(sessao)
    }

    const carregarSessao = useCallback( function () {
        try{
            setCarregando(true)
            const sessao = obterSessao()
            setSessao(sessao)
        } finally {
            setCarregando(false)
        }
    }, [])

    useEffect(() => {
        carregarSessao()
    }, [carregarSessao])

    function encerrarSessao() {
        cookie.remove(nomeCookie)
        setSessao({ token: null, usuario: null})
    }

    function obterSessao(): Sessao {

        const token = cookie.get(nomeCookie)
        if(!token){
            return { token: null, usuario: null}
        }  
        try {
            const payloadToken: any = jwtDecode(token)
            const valido = payloadToken.exp! > Date.now() / 1000
            if (!valido) {
                return { token: null, usuario: null}
            }
            return { 
                token, 
                usuario: {
                    id: payloadToken.id,
                    nome: payloadToken.nome,
                    email: payloadToken.email,
                    telefone: payloadToken.telefone,
                    celular: payloadToken.celular,
                    cnpj_cpf: payloadToken.cnpj_cpf,
                    administrador: payloadToken.administrador,
            }}
        } catch (error) {
            return { token: null, usuario: null}
        }

    }

    return (
        <ContextoSessao.Provider 
            value={{
                carregando,
                token: sessao.token,
                usuario: sessao.usuario,
                iniciarSessao,
                encerrarSessao,
            }}
        >
            {props.children}
        </ContextoSessao.Provider>
    )
}
