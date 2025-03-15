"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Plus, Trash2, X } from "lucide-react"

export function EditProfileForm({ profile, onSave, onCancel }) {
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <form className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="media">Fotos e Vídeos</TabsTrigger>
          <TabsTrigger value="certifications">Certificações</TabsTrigger>
          <TabsTrigger value="experience">Experiência</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize suas informações básicas de perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile?.avatar || "/placeholder.svg"} alt="Foto de perfil" />
                  <AvatarFallback>{profile?.name?.charAt(0) || "G"}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Alterar Foto
                  </Button>
                  <p className="text-xs text-muted-foreground">Recomendado: JPG ou PNG, 300x300 pixels</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" defaultValue={profile?.name} placeholder="Seu nome completo" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input id="location" defaultValue={profile?.location} placeholder="Cidade, País" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Descrição Curta</Label>
                <Input
                  id="shortDescription"
                  defaultValue={profile?.shortDescription}
                  placeholder="Uma breve descrição sobre você (máx. 100 caracteres)"
                  maxLength={100}
                />
                <p className="text-xs text-muted-foreground">
                  Esta descrição aparecerá nos resultados de busca e cartões de perfil.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">Descrição Completa</Label>
                <Textarea
                  id="fullDescription"
                  defaultValue={profile?.fullDescription}
                  placeholder="Descreva sua experiência, especialidades e o que os turistas podem esperar..."
                  className="min-h-[150px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Idiomas</CardTitle>
              <CardDescription>Adicione os idiomas que você fala</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile?.languages?.map((language, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input defaultValue={language.name} placeholder="Idioma" />
                  </div>
                  <div className="w-32">
                    <Select defaultValue={language.level}>
                      <SelectTrigger>
                        <SelectValue placeholder="Nível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nativo">Nativo</SelectItem>
                        <SelectItem value="Fluente">Fluente</SelectItem>
                        <SelectItem value="Avançado">Avançado</SelectItem>
                        <SelectItem value="Intermediário">Intermediário</SelectItem>
                        <SelectItem value="Básico">Básico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-20">
                    <Input type="number" min="0" max="100" defaultValue={language.progress} className="text-center" />
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Idioma
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Especialidades</CardTitle>
              <CardDescription>Áreas em que você tem conhecimento especializado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profile?.specialties?.map((specialty, index) => (
                  <div key={index} className="flex items-center bg-muted rounded-full px-3 py-1">
                    <span className="text-sm">{specialty}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 text-destructive">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="Adicionar especialidade..." className="flex-1" />
                <Button>Adicionar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Foto de Capa</CardTitle>
              <CardDescription>Esta imagem aparecerá no topo do seu perfil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-48 w-full rounded-lg overflow-hidden relative">
                  <img
                    src={profile?.coverPhoto || "/placeholder.svg?height=300&width=1200"}
                    alt="Capa do perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Alterar Foto de Capa
                </Button>
                <p className="text-xs text-muted-foreground">Recomendado: JPG ou PNG, 1200x300 pixels</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Galeria de Fotos e Vídeos</CardTitle>
              <CardDescription>Compartilhe imagens e vídeos das suas experiências</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile?.gallery?.map((item, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-video rounded-md overflow-hidden bg-muted">
                      <img
                        src={item.url || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <Input defaultValue={item.title} placeholder="Título" className="mt-2" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Button variant="destructive" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="aspect-video rounded-md border-2 border-dashed flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Adicionar Foto
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Adicionar Vídeo
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Arraste e solte arquivos aqui ou clique para fazer upload
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Certificações e Qualificações</CardTitle>
              <CardDescription>Suas credenciais profissionais e certificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile?.certifications?.map((cert, index) => (
                <div key={index} className="flex items-center gap-4 border-b pb-4">
                  <div className="flex-1">
                    <Input defaultValue={cert.name} placeholder="Nome da certificação" />
                  </div>
                  <div className="w-24">
                    <Input type="number" defaultValue={cert.year} placeholder="Ano" className="text-center" />
                  </div>
                  <div className="w-24">
                    <Select defaultValue={cert.verified ? "true" : "false"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Verificado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Sim</SelectItem>
                        <SelectItem value="false">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Certificação
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Formação Acadêmica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile?.education?.map((edu, index) => (
                <div key={index} className="flex items-center gap-4 border-b pb-4">
                  <div className="flex-1">
                    <Input defaultValue={edu.institution} placeholder="Instituição" className="mb-2" />
                    <Input defaultValue={edu.degree} placeholder="Título/Grau" />
                  </div>
                  <div className="w-32">
                    <Input defaultValue={edu.year} placeholder="Período" />
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Formação
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experiência Profissional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile?.experience?.map((exp, index) => (
                <div key={index} className="flex items-center gap-4 border-b pb-4">
                  <div className="flex-1">
                    <Input defaultValue={exp.position} placeholder="Cargo" className="mb-2" />
                    <Input defaultValue={exp.company} placeholder="Empresa" />
                  </div>
                  <div className="w-32">
                    <Input defaultValue={exp.period} placeholder="Período" />
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Experiência
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={onSave}>Salvar Alterações</Button>
      </div>
    </form>
  )
}

