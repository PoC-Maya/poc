"use client"

import { useEffect, useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DestinationCard } from "./destination-card"

const DESTINATIONS = [
    {title: "Cancún", image: "/destinations/cancun.jpg", url: "#"},
    {title: "Playa del Carmen", image: "/destinations/playa-del-carmen.jpg", url: "#"},
    {title: "Tulum", image: "/destinations/tulum.jpg", url: "#"},
    {title: "Isla Mujeres", image: "/destinations/isla-mujeres.jpg", url: "#"},
    {title: "Puerto Morelos", image: "/destinations/puerto-morelos.jpg", url: "#"},
    {title: "Bacalar", image: "/destinations/bacalar.jpg", url: "#"},
    {title: "Chetumal", image: "/destinations/chetumal.jpg", url: "#"},
    {title: "Costa Mujeres", image: "/destinations/costa-mujeres.jpg", url: "#"},
    {title: "Gran Costa Maya", image: "/destinations/gran-costa-maya.jpg", url: "#"},
    {title: "Isla Cozumel", image: "/destinations/isla-cozumel.jpg", url: "#"},
    {title: "Isla Hozbox", image: "/destinations/isla-hozbox.jpg", url: "#"},
    {title: "Maya Kaan", image: "/destinations/maya-kaan.jpg", url: "#"},
    {title: "Mahahual", image: "/destinations/mahahual.jpg", url: "#"},
]

export function DestinationsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: true,
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="relative px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Find by destination</h2>
        <p className="text-gray-600 mt-2">Find guides for destinations or guides who can take you there.</p>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {DESTINATIONS.map((destination, index) => (
            <div className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_30%] lg:flex-[0_0_25%] pl-4" key={index}>
              <DestinationCard {...destination} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === selectedIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 text-gray-800 hidden md:block"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 text-gray-800 hidden md:block"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}

