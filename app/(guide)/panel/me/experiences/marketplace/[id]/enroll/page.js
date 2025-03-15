"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Download, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

export default function EnrollExperiencePage({ params }) {
  const id = 1;
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const [formData, setFormData] = useState({
    availability: {
      monday: { active: false, startTime: "09:00", endTime: "17:00" },
      tuesday: { active: false, startTime: "09:00", endTime: "17:00" },
      wednesday: { active: false, startTime: "09:00", endTime: "17:00" },
      thursday: { active: false, startTime: "09:00", endTime: "17:00" },
      friday: { active: false, startTime: "09:00", endTime: "17:00" },
      saturday: { active: false, startTime: "09:00", endTime: "17:00" },
      sunday: { active: false, startTime: "09:00", endTime: "17:00" },
    },
    capacity: {
      adult: { min: 1, max: 4 },
      teen: { min: 0, max: 2 },
      child: { min: 0, max: 2 },
    },
    qualification: {
      q1: "",
      q2: "",
      q3: "",
      q4: "",
    },
    confirmation: {
      readItinerary: false,
      confirmAvailability: false,
      agreeTerms: false,
    },
  });

  // Simulando dados da experiência
  const experience = {
    id: id,
    title: "Mergulho nos Recifes de Cozumel",
    short_description:
      "Explore os incríveis recifes de coral em Cozumel com guias experientes",
    category: "Mergulho e Snorkeling",
    city: "Cozumel",
    price_from: 80,
  };

  // Perguntas de múltipla escolha para avaliação do guia
  const questions = [
    {
      id: "q1",
      question: "Qual é o seu nível de experiência com mergulho?",
      options: [
        {
          id: "q1-a",
          text: "Sou instrutor certificado com mais de 5 anos de experiência",
        },
        {
          id: "q1-b",
          text: "Sou instrutor certificado com 1-5 anos de experiência",
        },
        {
          id: "q1-c",
          text: "Sou mergulhador avançado, mas não sou instrutor certificado",
        },
        { id: "q1-d", text: "Tenho experiência básica com mergulho" },
      ],
    },
    {
      id: "q2",
      question: "Você já guiou turistas nos recifes de Cozumel antes?",
      options: [
        { id: "q2-a", text: "Sim, regularmente nos últimos 3+ anos" },
        { id: "q2-b", text: "Sim, ocasionalmente nos últimos 1-3 anos" },
        { id: "q2-c", text: "Sim, algumas vezes no último ano" },
        { id: "q2-d", text: "Não, nunca guiei nesta área específica" },
      ],
    },
    {
      id: "q3",
      question:
        "Você conhece os procedimentos de segurança e primeiros socorros para atividades de mergulho?",
      options: [
        {
          id: "q3-a",
          text: "Sim, sou certificado em primeiros socorros e resgate aquático",
        },
        {
          id: "q3-b",
          text: "Sim, tenho treinamento básico em primeiros socorros",
        },
        {
          id: "q3-c",
          text: "Conheço os procedimentos básicos, mas não tenho certificação formal",
        },
        {
          id: "q3-d",
          text: "Tenho conhecimento limitado sobre procedimentos de segurança",
        },
      ],
    },
    {
      id: "q4",
      question:
        "Como você avalia seu conhecimento sobre a vida marinha local e ecologia dos recifes?",
      options: [
        {
          id: "q4-a",
          text: "Excelente, tenho formação em biologia marinha ou área relacionada",
        },
        {
          id: "q4-b",
          text: "Muito bom, estudei extensivamente por conta própria",
        },
        {
          id: "q4-c",
          text: "Bom, conheço as espécies mais comuns e informações básicas",
        },
        {
          id: "q4-d",
          text: "Básico, ainda estou aprendendo sobre a vida marinha local",
        },
      ],
    },
  ];

  const handleNext = () => {
    const newStep = step + 1;
    setStep(newStep);
    setProgress(newStep * 25);
  };

  const handlePrevious = () => {
    const newStep = step - 1;
    setStep(newStep);
    setProgress(newStep * 25);
  };

  const handleSubmit = () => {
    // Aqui você implementaria a lógica para enviar os dados
    console.log("Form submitted:", formData);
    // Redirecionar para uma página de sucesso ou voltar para o marketplace
    router.push(
      `/panel/me/experiences/marketplace/${id}/enroll/success`
    );
  };

  const handleAvailabilityChange = (day, field, value) => {
    setFormData({
      ...formData,
      availability: {
        ...formData.availability,
        [day]: {
          ...formData.availability[day],
          [field]: value,
        },
      },
    });
  };

  const handleCapacityChange = (personType, field, value) => {
    setFormData({
      ...formData,
      capacity: {
        ...formData.capacity,
        [personType]: {
          ...formData.capacity[personType],
          [field]: Number.parseInt(value),
        },
      },
    });
  };

  const handleQualificationChange = (questionId, value) => {
    setFormData({
      ...formData,
      qualification: {
        ...formData.qualification,
        [questionId]: value,
      },
    });
  };

  const handleConfirmationChange = (field, value) => {
    setFormData({
      ...formData,
      confirmation: {
        ...formData.confirmation,
        [field]: value,
      },
    });
  };

  // Verificar se o formulário está completo para cada etapa
  const isAvailabilityComplete = Object.values(formData.availability).some(
    (day) => day.active
  );

  const isQualificationComplete = Object.values(formData.qualification).every(
    (answer) => answer !== ""
  );

  const isConfirmationComplete = Object.values(formData.confirmation).every(
    (value) => value === true
  );

  return (
    <div className="container max-w-4xl mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/panel/me/experiences/marketplace/${id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold">Inscrição: {experience.title}</h2>
      </div>

      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Disponibilidade</span>
          <span>Capacidade</span>
          <span>Qualificação</span>
          <span>Confirmação</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Inscreva-se nesta Experiência</CardTitle>
              <CardDescription>
                Complete os passos abaixo para se inscrever como guia para esta
                experiência
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Disponibilidade</h3>
                  <p className="text-sm text-muted-foreground">
                    Selecione os dias e horários em que você está disponível
                    para guiar esta experiência.
                  </p>

                  <div className="space-y-4">
                    {Object.entries(formData.availability).map(
                      ([day, data]) => {
                        const dayNames = {
                          monday: "Segunda-feira",
                          tuesday: "Terça-feira",
                          wednesday: "Quarta-feira",
                          thursday: "Quinta-feira",
                          friday: "Sexta-feira",
                          saturday: "Sábado",
                          sunday: "Domingo",
                        };

                        return (
                          <div
                            key={day}
                            className="flex items-center space-x-4"
                          >
                            <div className="flex items-center space-x-2 w-40">
                              <Switch
                                id={`day-${day}`}
                                checked={data.active}
                                onCheckedChange={(checked) =>
                                  handleAvailabilityChange(
                                    day,
                                    "active",
                                    checked
                                  )
                                }
                              />
                              <Label htmlFor={`day-${day}`}>
                                {dayNames[day]}
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Select
                                value={data.startTime}
                                onValueChange={(value) =>
                                  handleAvailabilityChange(
                                    day,
                                    "startTime",
                                    value
                                  )
                                }
                                disabled={!data.active}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="Início" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 24 }).map((_, hour) => (
                                    <SelectItem
                                      key={hour}
                                      value={`${hour
                                        .toString()
                                        .padStart(2, "0")}:00`}
                                    >
                                      {hour.toString().padStart(2, "0")}:00
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <span className="text-sm">até</span>

                              <Select
                                value={data.endTime}
                                onValueChange={(value) =>
                                  handleAvailabilityChange(
                                    day,
                                    "endTime",
                                    value
                                  )
                                }
                                disabled={!data.active}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="Fim" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 24 }).map((_, hour) => (
                                    <SelectItem
                                      key={hour}
                                      value={`${hour
                                        .toString()
                                        .padStart(2, "0")}:00`}
                                    >
                                      {hour.toString().padStart(2, "0")}:00
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Capacidade</h3>
                  <p className="text-sm text-muted-foreground">
                    Defina a capacidade mínima e máxima para cada tipo de
                    pessoa.
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium">Tipo de Pessoa</div>
                      <div className="font-medium">Mínimo</div>
                      <div className="font-medium">Máximo</div>
                    </div>

                    <Separator />

                    {Object.entries(formData.capacity).map(
                      ([personType, data]) => {
                        const personTypeNames = {
                          adult: "Adultos",
                          teen: "Adolescentes (12-17)",
                          child: "Crianças (0-11)",
                        };

                        return (
                          <div
                            key={personType}
                            className="grid grid-cols-3 gap-4 items-center"
                          >
                            <div>{personTypeNames[personType]}</div>
                            <Select
                              value={data.min.toString()}
                              onValueChange={(value) =>
                                handleCapacityChange(personType, "min", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Mín" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 13 }).map((_, i) => (
                                  <SelectItem key={i} value={i.toString()}>
                                    {i}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Select
                              value={data.max.toString()}
                              onValueChange={(value) =>
                                handleCapacityChange(personType, "max", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Máx" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 13 }).map((_, i) => (
                                  <SelectItem
                                    key={i}
                                    value={i.toString()}
                                    disabled={i < data.min}
                                  >
                                    {i}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Qualificação</h3>
                  <p className="text-sm text-muted-foreground">
                    Responda às perguntas abaixo para avaliarmos sua adequação a
                    esta experiência.
                  </p>

                  <div className="space-y-8">
                    {questions.map((q) => (
                      <div key={q.id} className="space-y-3">
                        <h4 className="font-medium">{q.question}</h4>
                        <RadioGroup
                          value={formData.qualification[q.id]}
                          onValueChange={(value) =>
                            handleQualificationChange(q.id, value)
                          }
                        >
                          {q.options.map((option) => (
                            <div
                              key={option.id}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={option.id}
                                id={option.id}
                              />
                              <Label htmlFor={option.id}>{option.text}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Confirmação</h3>
                  <p className="text-sm text-muted-foreground">
                    Revise e confirme sua inscrição.
                  </p>

                  <Alert
                    variant="warning"
                    className="bg-amber-50 text-amber-900 border-amber-200"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Atenção</AlertTitle>
                    <AlertDescription>
                      A ativação da sua inscrição pode levar até 24 horas para
                      ser processada.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="confirm-itinerary"
                        checked={formData.confirmation.readItinerary}
                        onCheckedChange={(checked) =>
                          handleConfirmationChange("readItinerary", checked)
                        }
                      />
                      <label htmlFor="confirm-itinerary" className="text-sm">
                        Confirmo que li e entendi o itinerário e requisitos
                        desta experiência
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="confirm-availability"
                        checked={formData.confirmation.confirmAvailability}
                        onCheckedChange={(checked) =>
                          handleConfirmationChange(
                            "confirmAvailability",
                            checked
                          )
                        }
                      />
                      <label htmlFor="confirm-availability" className="text-sm">
                        Confirmo que estou disponível nas datas e horários
                        selecionados
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="confirm-terms"
                        checked={formData.confirmation.agreeTerms}
                        onCheckedChange={(checked) =>
                          handleConfirmationChange("agreeTerms", checked)
                        }
                      />
                      <label htmlFor="confirm-terms" className="text-sm">
                        Concordo com os termos e condições para guias
                      </label>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h3 className="text-sm font-medium">
                      Material de Treinamento
                    </h3>
                    <div className="border rounded-md p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span>Manual do Guia - Mergulho em Cozumel.pdf</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                    </div>
                    <div className="border rounded-md p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span>Procedimentos de Segurança.pdf</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={handlePrevious}>
                  Voltar
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link href={`/panel/me/experiences/marketplace/${id}`}>
                    Cancelar
                  </Link>
                </Button>
              )}

              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !isAvailabilityComplete) ||
                    (step === 3 && !isQualificationComplete)
                  }
                >
                  Próximo
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isConfirmationComplete}
                >
                  Confirmar Inscrição
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Informações de Comissão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Valor guia:</span>
                  <span className="font-medium">74%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Comissão plataforma:</span>
                  <span className="font-medium">26%</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-sm">IVA do total:</span>
                  <span className="font-medium">16%</span>
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Preço base por pessoa:</span>
                    <span className="font-medium">
                      ${experience.price_from}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">
                      Estimativa de ganho (grupo de 4):
                    </span>
                    <span className="font-medium">
                      ${Math.round(experience.price_from * 4 * 0.74)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">
                      Estimativa de ganho (grupo de 8):
                    </span>
                    <span className="font-medium">
                      ${Math.round(experience.price_from * 8 * 0.74)}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                  Os pagamentos são processados semanalmente via transferência
                  bancária.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Resumo da Experiência</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{experience.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {experience.short_description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Categoria:</span>
                    <p>{experience.category}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Localização:</span>
                    <p>{experience.city}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Preço base:</span>
                    <p>${experience.price_from}/pessoa</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
