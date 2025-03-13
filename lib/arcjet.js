import arcjet, {
  slidingWindow,
  shield,
} from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  fingerprint: {
    parameters: ["userId"],
  },
  rules: [
    shield({
      mode: "LIVE",
    }),
    // Rotas públicas (registro/login)
    slidingWindow({
      mode: "LIVE",
      route: "/login/**/*,/register/**/*,/onboarding/registro/**/*",
      window: "30s",
      interval: "30s",
      max: 15,        // 15 tentativas a cada 30 segundos
      onReject: () => {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Muitas tentativas. Aguarde 30 segundos."
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": "30"
            }
          }
        );
      }
    }),
    // Actions autenticadas (profile)
    slidingWindow({
      mode: "LIVE",
      route: "/(tourist)/**/*",  // Rotas autenticadas
      window: "1m",
      interval: "1m",
      max: 30,        // 30 actions por minuto
      by: "userId",   // Rate limit por usuário
      onReject: () => {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Limite de ações atingido. Aguarde 1 minuto."
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": "60"
            }
          }
        );
      }
    }),
    // Chat actions (mais permissivo)
    slidingWindow({
      mode: "LIVE",
      route: "/(tourist)/chat/**/*",  // Rota do chat
      window: "15s",
      interval: "15s",
      max: 10,        // 10 mensagens a cada 15 segundos
      by: "userId",
      onReject: () => {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Muitas mensagens. Aguarde alguns segundos."
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": "15"
            }
          }
        );
      }
    })
  ]
});

export default aj;