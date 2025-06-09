'use client'
import { useState } from "react";
import Link from "next/link";
import Logo from "../shared/Logo";
import Image from "next/image";
import useFormAuth from "@/data/hooks/useFormAuth";
import CampoSenha from "../shared/formulario/CampoSenha";
import CampoTexto from "../shared/formulario/CampoTexto";
import CampoEmail from "../shared/formulario/CampoEmail";
import CampoTelefone from "../shared/formulario/CampoTelefone";


export default function FormAuth() {

    const { modo, nome, email, senha, telefone, alternarModo, submeter, alterarNome, alterarEmail, alterarSenha, alterarTelefone} = useFormAuth()
  
        
    return(
        <div className="text-white h-screen">
                   <Image src="/banners/fundo.webp" fill alt="Fundo" />
                   <div
                        className="
                        flex flex-col justify-center items-center
                        absolute top-0 left-0 w-full h-full
                        bg-black/80 gap-10
                        ">
    
                       <Logo />
                       <div>
                            {modo === 'login' ? (
                                <h1 className="text-2xl font-thin">Entrar na plataforma</h1>
                            ) : (
                                <h1 className="text-2xl font-thin">Cadastrar-se na plataforma</h1>
                            )}
                       </div>
                       <div className="flex flex-col gap-4 w-80">
                            
                            { modo === 'cadastro' && (
                                <CampoTexto placeholder="Nome" value={nome} onChangeText={alterarNome} />
                            )}

                            <CampoEmail placeholder="E-mail" value={email} onChangeText={alterarEmail}/>
                                                        
                            <CampoSenha placeholder="Senha" value={senha} onChangeText={alterarSenha} />
                           
                            { modo === 'cadastro' && (
                                <CampoTelefone placeholder="Telefone" value={telefone} onChangeText={alterarTelefone} />
                            )}
                            <div className="flex gap-4 ">
                                    <button onClick={submeter} className="button-form flex-1 bg-green-600">
                                        { modo === 'login' ? 'Entrar' : 'Cadastrar'}
                                    </button>
                                    <Link href="/" className="button-form flex-1 flex justify-center ">Cancelar</Link>
                            </div>
                            <div className="flex mt-6">
                                <button onClick={alternarModo} className="flex-1 button-outline">
                                    {modo === 'login' ? (
                                           <div>Ainda não tem conta? <span className="text-yellow-400 font-bold">Cadastre-se</span></div> 
                                    
                                        ) : (
                                            <div>Já tem conta? <span className="text-yellow-400 font-bold">Entre na plataforma</span></div> 
                                    )}
                                </button>
                            </div>
                       </div>
                   </div>
        </div>
    )
}

