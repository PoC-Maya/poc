import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center">
        <div className="relative h-10 w-40">
          <Image
            src="/logo.svg"
            alt="XploraCancun"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </Link>
  );
}
