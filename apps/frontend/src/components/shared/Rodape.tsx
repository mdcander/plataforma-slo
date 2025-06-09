import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";
import Logo from "./Logo";

export default function Rodape() {
    return (
        <footer className="container flex flex-col bg-black ">
            <div className="">
                
            </div>
            <div className="flex justify-between items-center text-zinc-400 ">
                <div className="flex gap-2 py-1 justify-center items-center">
                    <Logo/>
                    <IconBrandInstagram size={28} stroke={1} />
                    <IconBrandFacebook size={28} stroke={1} />
                    <IconBrandLinkedin size={28} stroke={1} />
                    <IconBrandTwitter size={28} stroke={1} />
                </div>
                <div className="flex gap-1.5 ">
                    <span>💻 Phasys®</span>
                    <span>- Todos os direitos reservados</span>
                </div>
            </div>
        </footer>
    )
}