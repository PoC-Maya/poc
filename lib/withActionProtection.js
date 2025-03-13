import aj from "@/lib/arcjet";

export async function withActionProtection(req, userId) {
  if (!userId) {
    console.error("Erro: userId está indefinido!");
    throw new Error("Usuário não autenticado.");
  }

  console.log("Protegendo ação para userId:", userId);

  // Chamando Arcjet com o ID do usuário como característica personalizada
  const decision = await aj.protect(req, {
    characteristics: { custom: userId },
    requested: 1,
  });
  console.log("Arcjet decision:", decision);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw new Error("Muitas requisições. Tente novamente mais tarde.");
    } else if (decision.reason.isBot()) {
      throw new Error("Bots não são permitidos.");
    } else {
      throw new Error("Acesso negado.");
    }
  }
}
