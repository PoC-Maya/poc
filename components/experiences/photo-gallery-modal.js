"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PhotoGalleryModal({ images, isOpen, onClose, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex, isOpen])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      handlePrevious()
    } else if (e.key === "ArrowRight") {
      handleNext()
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 bg-black/90 border-none" onEscapeKeyDown={onClose}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 text-white hover:bg-white/20 rounded-full"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="relative h-[80vh] w-full flex items-center justify-center">
          <div className="relative h-full w-full">
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Gallery image ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 z-50 text-white hover:bg-white/20 rounded-full h-12 w-12"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 z-50 text-white hover:bg-white/20 rounded-full h-12 w-12"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>

        <div className="bg-black/90 p-4 text-white text-center">
          <p>
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

