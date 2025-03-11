import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  ChevronLeft,
  ChevronDown,
  Share,
  Heart,
  User,
  Calendar,
  Tag,
  Check,
  Search,
} from "lucide-react";
import { HeaderSectionForPage } from "@/components/general/HeaderPage";

const DesignGuide = () => {
  return (
    <>
      <div className="font-sans bg-gray-100 p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Guia de Design XPLORA</h1>

        {/* Cores */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Cores</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-full h-20 bg-[#00A884] rounded-md mb-2"></div>
              <span className="text-sm">Principal (#00A884)</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full h-20 bg-black rounded-md mb-2"></div>
              <span className="text-sm">Preto (#000000)</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full h-20 bg-white border rounded-md mb-2"></div>
              <span className="text-sm">Branco (#FFFFFF)</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full h-20 bg-[#F5F9F8] rounded-md mb-2"></div>
              <span className="text-sm">Fundo (#F5F9F8)</span>
            </div>
          </div>
        </section>

        {/* Tipografia */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Tipografia</h2>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-2xl font-bold mb-2">Poppins Bold</p>
            <p className="text-xl font-semibold mb-2">Poppins Semibold</p>
            <p className="text-base font-medium mb-2">Poppins Medium</p>
            <p className="text-sm font-normal">Poppins Regular</p>
          </div>
        </section>

        {/* Botões */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Botões</h2>
          <div className="flex flex-col gap-4">
            <Button className="btn btn-primary">btn btn-primary</Button>
            <Button className="btn btn-secondary">btn btn-secondary</Button>
            <Button className="btn btn-ghost">btn btn-ghost</Button>
            <Button className="btn btn-outline">btn btn-outline</Button>

            <div className="flex gap-2">
              <Button variant="default" className="rounded-full p-2 h-10 w-10">
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button variant="destructive" className="rounded-full p-2 h-10 w-10">
                <Heart className="h-6 w-6" />
              </Button>
              <Button variant="outline" className="rounded-full p-2 h-10 w-10">
                <Share className="h-6 w-6" />
              </Button>
              <Button variant="secondary" className="rounded-full p-2 h-10 w-10">
                <Share className="h-6 w-6" />
              </Button>
              <Button variant="ghost" className="rounded-full p-2 h-10 w-10">
                <Share className="h-6 w-6" />
              </Button>
              <Button variant="link" className="rounded-full p-2 h-10 w-10">
                <Share className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Cards</h2>

          {/* Exemplo Pagamento */}
          <Card className="mb-6 bg-[#F5F9F8] shadow-none border-none">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <div className="flex items-center">
                <span className="mr-2">
                  <Tag className="h-5 w-5" />
                </span>
                <CardTitle className="text-base">
                  Desglose de precios (EUR)
                </CardTitle>
                <ChevronDown className="ml-2 h-5 w-5" />
              </div>
              <div className="font-bold">293,06 €</div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex justify-between py-2">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>2 adultos</span>
                </div>
                <span className="font-medium">293,06 €</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between py-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Mar, 11 mar 2025 • 17:30</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exemplo Reserva Vazia */}
          <Card className="mb-6 border-none shadow-sm">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="rounded-full border p-6 mb-4">
                <Tag className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Aún no hay viajes reservados
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Es hora de quitarle el polvo a las maletas y empezar a
                planificar su próxima aventura
              </p>
              <Button className="btn btn-primary">
                Busca cosas que hacer
              </Button>
            </CardContent>
          </Card>

          {/* Exemplo Atividade */}
          <Card className="mb-6 shadow-sm">
            <CardContent className="p-0">
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">
                  Jolly Roger Pirate Show Cancun
                </h3>
                <p className="text-gray-700 text-sm">
                  Disfruta de un espectáculo épico a bordo del famoso barco
                  pirata "Jolly Roger"...
                </p>
                <div className="flex items-center my-2">
                  <Button
                    variant="link"
                    className="h-auto p-0 text-black underline font-semibold"
                  >
                    Leer menos
                  </Button>
                </div>
                <div className="py-1">
                  <Badge variant="outline" className="bg-white text-gray-700">
                    Entrada incluida
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Collapsible */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Collapsible Panels</h2>
          <Collapsible className="bg-white rounded-lg shadow-sm w-full mb-4">
            <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
              <div className="flex items-center">
                <div className="rounded-full bg-black text-white w-6 h-6 flex items-center justify-center mr-2">
                  1
                </div>
                <span className="font-medium">French Quarter</span>
              </div>
              <ChevronDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>3 horas</span>
                <span>Entrada gratuita</span>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="bg-white rounded-lg shadow-sm w-full">
            <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
              <div className="flex items-center">
                <div className="rounded-full bg-black text-white w-6 h-6 flex items-center justify-center mr-2">
                  2
                </div>
                <span className="font-medium">French Market</span>
              </div>
              <ChevronDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>15 minutos</span>
                <span>Entrada gratuita</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </section>

        {/* Ratings */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Avaliações e Reviews</h2>
          <Card>
            <CardHeader>
              <CardTitle>Opiniones</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold">4.8</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-[#00A884] text-[#00A884]"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm">5.084 opiniones</p>
            </CardHeader>
            <CardContent>
              <Card className="shadow-none border mb-4">
                <CardHeader className="p-4 pb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#00A884] text-[#00A884]"
                      />
                    ))}
                  </div>
                  <CardTitle className="text-base font-semibold">
                    Interesante y conveniente
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-gray-600">
                    Interesante visita con tapas, cantidades generosas,
                    suficiente para no tener que comer después.
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium">Carlos_P</span>
                    <span className="text-xs text-gray-500">mayo 2024</span>
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" className="w-full">
                Ver todas
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Menu inferior */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Menu de Navegação</h2>
          <div className="bg-white rounded-t-lg p-4 shadow-md flex justify-between">
            <div className="flex flex-col items-center">
              <Search className="h-6 w-6 text-gray-500" />
              <span className="text-xs text-gray-500">Explorar</span>
            </div>

            <div className="flex flex-col items-center">
              <Tag className="h-6 w-6 text-[#00A884]" />
              <span className="text-xs text-[#00A884] font-medium">
                Reservas
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Heart className="h-6 w-6 text-gray-500" />
              <span className="text-xs text-gray-500">Lista de deseos</span>
            </div>

            <div className="flex flex-col items-center">
              <User className="h-6 w-6 text-gray-500" />
              <span className="text-xs text-gray-500">Perfil</span>
            </div>
          </div>
        </section>

        {/* Status de navegação */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Status de Navegação</h2>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-2">
                1
              </div>
              <span className="text-black underline">Contacto</span>
            </div>
            <ChevronRight className="h-5 w-5" />

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-2">
                2
              </div>
              <span className="text-black underline">Actividad</span>
            </div>
            <ChevronRight className="h-5 w-5" />

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-2">
                3
              </div>
              <span className="font-bold">Pago</span>
            </div>
          </div>
        </section>
      </div>
      <div className="font-sans max-w-xl mx-auto bg-white min-h-screen">
        {/* Header */}
        <HeaderSectionForPage title="Summary" />

        {/* Desglose de precios */}
        <Card className="m-4 bg-[#F5F9F8] shadow-none border-none">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <div className="flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              <CardTitle className="text-base">
                Desglose de precios (EUR)
              </CardTitle>
              <ChevronDown className="ml-2 h-5 w-5" />
            </div>
            <div className="font-bold">293,06 €</div>
          </CardHeader>
        </Card>

        {/* Detalhes da Atividade */}
        <div className="px-4">
          <div className="flex gap-4 mb-4">
            <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
              <img
                src="/api/placeholder/80/80"
                alt="Espectáculo pirata"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-bold text-lg">
                Espectáculo nocturno pirata y cena en Jolly Roger
              </h2>
              <div className="flex items-center text-sm mt-1">
                <div className="bg-[#00A884] rounded p-1 mr-2">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm">
                  Recomendado por un 91 % de los viajeros
                </span>
              </div>
              <div className="flex items-center mt-1">
                <div className="text-[#00A884]">
                  <Star className="h-5 w-5 inline fill-[#00A884]" />
                  <span className="ml-1 font-medium">4.6 (1555)</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Detalhes */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>2 adultos</span>
              </div>
              <span className="font-semibold">293,06 €</span>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Mar, 11 mar 2025 • 17:30</span>
            </div>

            <div className="flex items-center">
              <Check className="h-5 w-5 text-[#00A884] mr-2" />
              <div>
                <span className="font-bold underline">Free cancellation</span> +
                <br />
                <span className="font-bold underline">
                  Unlimited rescheduling
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ChevronRight = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
};

export default DesignGuide;
