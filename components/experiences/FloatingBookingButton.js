"use client"

import { Button } from "@/components/ui/button"

export function FloatingBookingButton({ price, currency, onClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">desde</p>
        <p className="text-xl font-bold">
          {currency} {price.toFixed(2)}
        </p>
      </div>
      <Button className="bg-black text-white hover:bg-black/90 px-6 py-6" onClick={onClick}>
        Ver disponibilidad
      </Button>
    </div>
  )
}

