"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, PaperclipIcon, ImageIcon, Smile } from "lucide-react"
import { CustomTourRequestCard } from "./custom-tour-request-card"
import { CustomTourRequestForm } from "./custom-tour-request-form"
import { CustomTourDetails } from "./custom-tour-details"

// Dados de exemplo
const messages = [
  {
    id: 1,
    sender: "guide",
    text: "Olá! Como posso ajudar você hoje?",
    timestamp: "2023-07-10T10:30:00Z",
  },
  {
    id: 2,
    sender: "user",
    text: "Estou interessado em fazer um tour em Cancún. Você tem disponibilidade para a próxima semana?",
    timestamp: "2023-07-10T10:32:00Z",
  },
  {
    id: 3,
    sender: "guide",
    text: "Sim, tenho disponibilidade! Estou oferecendo tours para Chichen Itza, Tulum e Isla Mujeres. Qual desses lugares você gostaria de visitar?",
    timestamp: "2023-07-10T10:35:00Z",
  },
]

const guideData = {
  id: "1",
  name: "Carlos Rodriguez",
  avatar: "/placeholder.svg?height=100&width=100",
}

const userData = {
  id: "user1",
  name: "Você",
  avatar: "/placeholder.svg?height=100&width=100",
}

export function ChatInterface({ guideId, requestType }) {
  const [chatMessages, setChatMessages] = useState(messages)
  const [newMessage, setNewMessage] = useState("")
  const [showTourRequestForm, setShowTourRequestForm] = useState(false)
  const [tourRequest, setTourRequest] = useState(null)
  const [showTourDetails, setShowTourDetails] = useState(false)
  const [tourProposal, setTourProposal] = useState(null)
  const messagesEndRef = useRef(null)

  // Exemplo de proposta de tour
  const exampleProposal = {
    id: "prop1",
    title: "Tour Personalizado em Cancún",
    date: "2023-08-15",
    duration: "8",
    people: "4",
    price: 2400,
    description:
      "Um tour exclusivo pelos melhores pontos de Cancún, incluindo praias paradisíacas, cenotes e ruínas maias.",
    meetingPoint: "Lobby do seu hotel",
    inclusions: [
      "Transporte privativo",
      "Guia exclusivo",
      "Almoço em restaurante local",
      "Entradas para atrações",
      "Água mineral",
    ],
    exclusions: ["Gorjetas", "Bebidas alcoólicas", "Itens pessoais"],
    itinerary:
      "09:00 - Busca no hotel\n10:00 - Visita à praia Delfines\n12:00 - Almoço em restaurante local\n14:00 - Visita ao Museu Maya\n16:00 - Tempo livre para compras\n18:00 - Retorno ao hotel",
  }

  useEffect(() => {
    // Se o tipo de solicitação for "custom", abrir o formulário de tour personalizado
    if (requestType === "custom") {
      setShowTourRequestForm(true)
    }

    scrollToBottom()
  }, [requestType, chatMessages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message = {
      id: chatMessages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date().toISOString(),
    }

    setChatMessages([...chatMessages, message])
    setNewMessage("")

    // Simular resposta do guia após 1 segundo
    setTimeout(() => {
      if (chatMessages.length === 3) {
        // Simular proposta de tour após algumas mensagens
        const guideResponse = {
          id: chatMessages.length + 2,
          sender: "guide",
          text: "Baseado no que você me contou, preparei uma proposta de tour personalizado. Dê uma olhada e me diga o que acha:",
          timestamp: new Date().toISOString(),
        }

        setChatMessages((prev) => [...prev, guideResponse])
        setTourProposal(exampleProposal)
        setTimeout(() => setShowTourDetails(true), 500)
      } else {
        const guideResponse = {
          id: chatMessages.length + 2,
          sender: "guide",
          text: "Entendi! Vou preparar algumas opções para você. Tem alguma preferência específica de horário ou lugares que gostaria de visitar?",
          timestamp: new Date().toISOString(),
        }

        setChatMessages((prev) => [...prev, guideResponse])
      }
    }, 1000)
  }

  const handleTourRequestSubmit = (requestData) => {
    setTourRequest(requestData)

    // Adicionar mensagem do sistema sobre a solicitação
    const systemMessage = {
      id: chatMessages.length + 1,
      sender: "system",
      text: "Você enviou uma solicitação de tour personalizado",
      timestamp: new Date().toISOString(),
    }

    setChatMessages([...chatMessages, systemMessage])

    // Simular resposta do guia após 1 segundo
    setTimeout(() => {
      const guideResponse = {
        id: chatMessages.length + 2,
        sender: "guide",
        text: "Recebi sua solicitação de tour personalizado! Vou analisar e preparar uma proposta para você em breve. Enquanto isso, você tem alguma preferência específica que gostaria de mencionar?",
        timestamp: new Date().toISOString(),
      }

      setChatMessages((prev) => [...prev, guideResponse])
    }, 1000)
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Avatar className="h-10 w-10 mr-3">
          <img src={guideData.avatar || "/placeholder.svg"} alt={guideData.name} />
        </Avatar>
        <div>
          <h3 className="font-medium">{guideData.name}</h3>
          <p className="text-xs text-muted-foreground">Guia Local • Cancún</p>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {tourRequest && <CustomTourRequestCard request={tourRequest} onEdit={() => setShowTourRequestForm(true)} />}

          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : message.sender === "system" ? "justify-center" : "justify-start"}`}
            >
              {message.sender === "system" ? (
                <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">{message.text}</div>
              ) : (
                <div
                  className={`max-w-[70%] ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 text-right mt-1">{formatTime(message.timestamp)}</p>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <PaperclipIcon className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="shrink-0">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button variant="outline" size="icon" className="shrink-0">
            <Smile className="h-5 w-5" />
          </Button>
          <Button size="icon" className="shrink-0" onClick={handleSendMessage}>
            <Send className="h-5 w-5" />
          </Button>
        </div>

        {!tourRequest && (
          <Button variant="outline" className="w-full mt-2" onClick={() => setShowTourRequestForm(true)}>
            Solicitar Tour Personalizado
          </Button>
        )}
      </div>

      {/* Tour Request Form */}
      <CustomTourRequestForm
        open={showTourRequestForm}
        onOpenChange={setShowTourRequestForm}
        onSubmit={handleTourRequestSubmit}
        initialData={tourRequest}
      />

      {/* Tour Details */}
      {tourProposal && (
        <CustomTourDetails
          open={showTourDetails}
          onOpenChange={setShowTourDetails}
          proposal={tourProposal}
          onEdit={() => {}}
          onRequestChanges={() => {}}
        />
      )}
    </div>
  )
}

