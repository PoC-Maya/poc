// middleware.js
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { requireAuth } from "@/lib/withAuth"; // Adicionar este import
import aj from "@/lib/arcjet";

// Rotas que NÃO precisam de autenticação
const publicRoutes = [
  "/login",
  "/register",
  "/error",
  "/onboarding/registro/**/*",
  "/",
  // Adicione aqui outras rotas públicas
];

export async function middleware(request) {
  // Primeiro, verificar se é rota pública
  if (
    publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    // Mesmo para rotas públicas, ainda precisamos verificar rate limit para POSTs
      if (request.method === "POST") {
        try {
          console.log("Verificando rate limit para:", request.url);
          const result = await aj.protect(request);

          console.log("Arcjet resultado:", {
            allowed: result.isAllowed,
            url: request.url,
            time: new Date().toLocaleTimeString()
          });

          if (!result.isAllowed) {
            console.log("Request bloqueado por rate limit");
            return NextResponse.json(
              {
                success: false,
                error: "Taxa de requisições excedida"
              },
              { status: 429 }
            );
          }
        } catch (error) {
          console.error("Erro no middleware:", error);
          return NextResponse.json(
            {
              success: false,
              error: "Erro ao verificar rate limit"
            },
            { status: 429 }
          );
        }
      }
    return NextResponse.next();
  }

  // Caso contrário, exige a verificação da sessão
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
