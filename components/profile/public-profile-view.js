"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, Globe, Award, Calendar, MessageSquare, Briefcase, GraduationCap } from "lucide-react"

export function PublicProfileView({ profile }) {
  return (
    <div className="container mx-auto p-6">
      {/* Capa e Foto de Perfil */}
      <div className="relative mb-16">
        <div className="h-64 w-full rounded-lg overflow-hidden">
          <img
            src={profile.coverPhoto || "/placeholder.svg"}
            alt="Capa do perfil"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute -bottom-12 left-8 flex items-end">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 mb-2">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-12 right-8 flex items-center">
          <div className="flex items-center mr-4">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 font-medium">{profile.rating}</span>
            <span className="text-muted-foreground ml-1">({profile.reviewCount} avaliações)</span>
          </div>
          <Badge variant="outline" className="ml-2">
            Guia Verificado
          </Badge>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">Sobre</TabsTrigger>
            <TabsTrigger value="gallery">Galeria</TabsTrigger>
            <TabsTrigger value="experience">Experiência</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sobre {profile.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{profile.fullDescription}</p>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Idiomas</h3>
                  <div className="space-y-4">
                    {profile.languages.map((language, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium">{language.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{language.level}</span>
                        </div>
                        <Progress value={language.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Especialidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certificações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start">
                      <Award className="h-5 w-5 mr-3 text-primary mt-0.5" />
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{cert.name}</h3>
                          {cert.verified && (
                            <Badge variant="outline" className="ml-2">
                              Verificado
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Obtido em {cert.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Galeria de Fotos e Vídeos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.gallery.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="aspect-video rounded-md overflow-hidden bg-muted">
                        <img
                          src={item.url || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-medium text-sm">{item.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Formação Acadêmica</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="flex items-start">
                      <GraduationCap className="h-5 w-5 mr-3 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">{edu.degree}</h3>
                        <p className="text-sm">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experiência Profissional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="flex items-start">
                      <Briefcase className="h-5 w-5 mr-3 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">{exp.position}</h3>
                        <p className="text-sm">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Avaliações de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Exemplo de avaliações */}
                  <div className="border-b pb-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" alt="Carlos Silva" />
                        <AvatarFallback>CS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">Carlos Silva</h3>
                          <span className="text-sm text-muted-foreground ml-2">Julho 2023</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-sm">
                          Excelente guia! Conhece muito sobre a história maia e os melhores lugares para mergulho.
                          Recomendo fortemente!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b pb-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" alt="Ana Pereira" />
                        <AvatarFallback>AP</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">Ana Pereira</h3>
                          <span className="text-sm text-muted-foreground ml-2">Junho 2023</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {[1, 2, 3, 4].map((star) => (
                            <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          ))}
                          {[5].map((star) => (
                            <Star key={star} className="h-4 w-4 text-gray-300" />
                          ))}
                        </div>
                        <p className="mt-2 text-sm">
                          Experiência incrível! O guia é muito atencioso e conhece lugares incríveis que não estão nos
                          roteiros turísticos comuns.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="fixed bottom-6 right-6 flex gap-2">
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Ver Disponibilidade
        </Button>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Contatar Guia
        </Button>
      </div>
    </div>
  )
}

