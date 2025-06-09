'use client';
import Slogan from "@/components/home/Slogan";
import StatusProcesso from "@/components/servico/StatusProcesso";
import Rodape from "@/components/shared/Rodape";
import SecaoBackground from "@/components/shared/SecaoBackground";


export default function Home() {
  return (
    <div className="flex flex-col">
      <Slogan/>
      <SecaoBackground imagem="/banners/livros.webp">
        <StatusProcesso/>
      </SecaoBackground>
      <Rodape/>
    </div>
  );
}
