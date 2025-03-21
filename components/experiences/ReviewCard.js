"use client"

import Image from "next/image"
import { Star } from "lucide-react"

export function ReviewCard({ review }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center mb-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
          <Image src={review.avatar || "/placeholder.svg"} alt={review.user} fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-medium">{review.user}</h3>
          <div className="flex items-center">
            <div className="flex mr-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  )
}

