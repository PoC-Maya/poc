import Image from "next/image"
import Link from "next/link"

export function DestinationCard({ title, image, url }) {
  return (
    <Link
      href={url}
      className="group block relative rounded-lg overflow-hidden h-48 shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />

      <Image
        src={image || "/placeholder.svg"}
        alt={`Destino: ${title}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        priority
      />

      <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
      </div>
    </Link>
  )
}

