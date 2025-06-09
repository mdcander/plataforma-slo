import TituloSecao from "../shared/TituloSecao";

export default function StatusProcesso (){
    return(
        <div className="flex flex-col gap-5 h-100">
            <TituloSecao principal={"Status atualizado processo"} secundario="Consulte status do processo" tag="Cliente" ></TituloSecao>
            <div className="flex flex-col gap-5">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <input type="" className=" bg-white w-100 h-8"></input>
                    <button className="button">Buscar</button>
                </div>
                <div className="flex items-center justify-center">
                    <textarea className="bg-white w-250 h-50"></textarea>
                </div>
            </div>
        </div>
    )
}