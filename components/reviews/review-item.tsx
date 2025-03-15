"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"
import { useState } from "react"

export type ReviewItemProps = {
  id: string
  turista: {
    id: string
    nome: string
    avatar: string
  }
  experiencia: {
    id: string
    titulo: string
  }
  avaliacao: number
  comentario: string
  data: string
  curtidas: number
  resposta?: {
    texto: string
    data: string
  }
}

export function ReviewItem({ review }: { review: ReviewItemProps }) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(review.curtidas)
  const [hasReply, setHasReply] = useState(!!review.resposta)
  const [replyContent, setReplyContent] = useState(review.resposta?.texto || "")

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setLiked(!liked)
  }

  const handleReply = () => {
    if (!replyText.trim()) return

    // Aqui você implementaria a lógica para salvar a resposta
    console.log("Resposta enviada:", replyText)

    setReplyContent(replyText)
    setHasReply(true)
    setShowReplyForm(false)
    setReplyText("")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.turista.avatar} alt={review.turista.nome} />
            <AvatarFallback>{review.turista.nome.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <h4 className="font-medium">{review.turista.nome}</h4>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(review.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.avaliacao ? "text-yellow-500 fill-yellow-500" : "text-gray-300 fill-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-2">
              <p className="text-sm">{review.comentario}</p>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground" onClick={handleLike}>
                <ThumbsUp className={`h-4 w-4 mr-1 ${liked ? "fill-primary text-primary" : ""}`} />
                <span>{likesCount}</span>
              </Button>

              {!hasReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-muted-foreground"
                  onClick={() => setShowReplyForm(!showReplyForm)}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>Responder</span>
                </Button>
              )}
            </div>

            {showReplyForm && (
              <div className="mt-4 space-y-2">
                <Textarea
                  placeholder="Escreva sua resposta..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowReplyForm(false)}>
                    Cancelar
                  </Button>
                  <Button size="sm" onClick={handleReply}>
                    Enviar Resposta
                  </Button>
                </div>
              </div>
            )}

            {hasReply && (
              <div className="mt-4 pl-4 border-l-2 border-muted">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" alt="Você" />
                    <AvatarFallback>V</AvatarFallback>
                  </Avatar>
                  <div>
                    <h5 className="text-sm font-medium">Você</h5>
                    <p className="text-xs text-muted-foreground">
                      {review.resposta?.data
                        ? format(new Date(review.resposta.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                        : format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <p className="text-sm mt-2">{replyContent}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-3">
        <div className="w-full text-xs text-muted-foreground">
          <span>Experiência: </span>
          <span className="font-medium">{review.experiencia.titulo}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

