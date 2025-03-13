"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Carousel({ items }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <Card className="w-full border-none bg-transparent shadow-none">
        <CardContent className="p-0">
          <div className="relative h-[300px] w-full">
            <Image
              src={items[currentSlide].image}
              alt={items[currentSlide].title}
              fill
              className="object-cover rounded-lg"
              priority={currentSlide === 0}
            />

            {/* Título sobreposto */}
            <div className="absolute top-0 left-0 right-0 bg-black/90 p-4 rounded-t-lg">
              <h3 className="text-white font-semibold text-lg">
                {items[currentSlide].title}
              </h3>
            </div>

            {/* Descrição sobreposta */}
            <div className="absolute bottom-0 left-0 right-0 bg-green-600/90 p-4 rounded-b-lg">
              <p className="text-white text-sm">
                {items[currentSlide].description}
              </p>
            </div>

            {/* Controles de navegação */}
            <div className="absolute inset-x-0 top-1/2 flex justify-between transform -translate-y-1/2 px-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black hover:bg-black/80"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-black hover:bg-black/80"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
