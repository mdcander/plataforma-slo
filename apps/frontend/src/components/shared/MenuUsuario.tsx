import useSessao from "@/data/hooks/useSessao";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Image from "next/image";
import { IconCalendar, IconHome, IconLogout } from "@tabler/icons-react";
import Link from "next/link";

export default function MenuUsuario() {
    const { usuario, encerrarSessao } = useSessao()

    return usuario ? (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center gap-3 text-white cursor-pointer">
                    <div className="flex flex-col items-end">
                        <span className="font-bold">{usuario?.nome}</span>
                        <span className="text-zinc-400 text-xs">{usuario?.email}</span>   
                    </div>
                    <div className="bg-zinc-700 w-10 rounded-full p-1 relative">
                        <Image src="/profissionais/profissional.webp" width={40} height={40}  alt="Avatar" />
                    </div>
                </div>           
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-800 text-white cursor-pointer">
                <DropdownMenuItem>
                    <Link href="/" className="flex gap-2 ">
                        <IconHome size={16} color="white" /> 
                        <span>Inicio</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/internas/agendamento" className="flex gap-2 ">
                        <IconCalendar size={16} color="white" /> 
                        <span>Agendamento</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-500"/>
                <DropdownMenuItem className="flex gap-2 text-red-500" onClick={encerrarSessao}>
                    <IconLogout size={16} color="white" /> 
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : null
}