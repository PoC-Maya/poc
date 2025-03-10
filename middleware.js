import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request) {
  // Rotas que NÃO precisam de autenticação
  const publicRoutes = ["/auth/login", "/auth/register", "/error", "/"]; // Exemplos de rotas públicas

  // Se a rota for uma das públicas, não precisa passar pela verificação de autenticação
  if (
    publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.next(); // Permite a navegação sem autenticação
  }

  // Caso contrário, exige a verificação da sessão
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
