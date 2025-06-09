import useSessao from "./useSessao"

export default function useAPI() {
    
    const { token } = useSessao()
    const urlBase = process.env.NEXT_PUBLIC_API_URL

    async function httpGet(caminho: string) {
        const uri = caminho.startsWith('/') ? caminho : `/${caminho}`
        const urlCompleta = `${urlBase}${uri}`

        const resposta = await fetch(urlCompleta, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!resposta) {
            return null;
        }
        return resposta ? extrairDados(resposta) : null
    }

    async function httpPost(caminho: string, body: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        const uri = caminho.startsWith('/') ? caminho : `/${caminho}`
        const urlCompleta = `${urlBase}${uri}`
        let resposta: Response | undefined
        
        console.log('urlCompleta:', urlCompleta)
        console.log('Body:', body)
        try {
                resposta = await fetch( urlCompleta, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.error('Error try fetch',error);
        }
        return resposta ? extrairDados(resposta) : null

    }

    return { httpGet, httpPost }
}

async function extrairDados(resposta: Response) {
    let conteudo = ''
    try {
        conteudo = await resposta.text()
        return JSON.parse(conteudo)
    } catch (e) {
        return conteudo
    }
}
