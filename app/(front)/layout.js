import Link from "next/link"
import Image from "next/image"
import { Menu, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AuthButton } from "@/components/auth/auth-button"

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="mt-4 mb-8">
                  <Image src="/logo.svg" alt="XploraCancun" width={150} height={40} className="h-10 w-auto" />
                </div>
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="text-lg font-semibold hover:text-brand-500">
                    Início
                  </Link>
                  <Link href="/experiences" className="text-lg font-semibold hover:text-brand-500">
                    Experiências
                  </Link>
                  <Link href="/guides" className="text-lg font-semibold hover:text-brand-500">
                    Guias
                  </Link>
                  <Link href="/about" className="text-lg font-semibold hover:text-brand-500">
                    Sobre
                  </Link>
                  <Link href="/contact" className="text-lg font-semibold hover:text-brand-500">
                    Contato
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="XploraCancun" width={150} height={40} className="h-8 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/experiences" className="text-sm font-medium transition-colors hover:text-brand-500">
                Experiências
              </Link>
              <Link href="/guides" className="text-sm font-medium transition-colors hover:text-brand-500">
                Guias
              </Link>
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-brand-500">
                Sobre
              </Link>
              <Link href="/contact" className="text-sm font-medium transition-colors hover:text-brand-500">
                Contato
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            
            <Button variant="ghost" size="icon" className="hover:text-brand-500">
              <User className="h-5 w-5" />
              <span className="sr-only">Perfil</span>
            </Button>

            <AuthButton />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t py-6 md:py-10 bg-gradient-to-b from-white to-brand-50">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Image src="/logo.svg" alt="XploraCancun" width={150} height={40} className="h-8 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A melhor plataforma para encontrar guias turísticos e experiências únicas em Cancún e região.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-brand-500">
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
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-brand-500">
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
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-brand-500">
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
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Experiências</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-brand-500">
                  Day Trips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-brand-500">
                  Archaeology Tours
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-brand-500">
                  Snorkeling
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-brand-500">
                  Catamaran Cruises
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-brand-500">
                  Nature Tours
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Destinos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-brand-500">
                  Cancún
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-brand-500">
                  Tulum
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-brand-500">
                  Playa del Carmen
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-brand-500">
                  Isla Mujeres
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-brand-500">
                  Cozumel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ajuda" className="text-muted-foreground hover:text-brand-500">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-muted-foreground hover:text-brand-500">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-muted-foreground hover:text-brand-500">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/cancelamento" className="text-muted-foreground hover:text-brand-500">
                  Política de Cancelamento
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-brand-500">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mt-8 pt-4 border-t">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} XploraCancun. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

