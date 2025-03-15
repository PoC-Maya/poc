"use client"

import { useSearchParams } from "next/navigation"
import { ChatInterface } from "@/components/chat/chat-interface"

export default function ChatPage({ params }) {
  const searchParams = useSearchParams()
  const requestType = searchParams.get("type")

  return (
    <div className="container py-6">
      <ChatInterface guideId={params.id} requestType={requestType} />
    </div>
  )
}

