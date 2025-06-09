import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return(
        <Link href="/" className="flex items-center gap-2 ">
            <Image src="/banners/logo.webp" alt="logo" width={55} height={55} className="hidden sm:block"/>
            <Image src="/banners/logo.webp" alt="logo" width={45} height={45} className="block sm:hidden"/>
            
        </Link>
    )
}