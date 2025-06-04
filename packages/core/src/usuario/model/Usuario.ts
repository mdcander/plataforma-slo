export interface Usuario {
    id?: number
    nome: string
    email: string
    senha?: string
    telefone?: string
    celular?: string
    cnpj_cpf: string
    administrador?: boolean
}