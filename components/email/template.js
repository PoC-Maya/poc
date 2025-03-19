import * as React from "react";

export const EmailTemplate = ({ firstName }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    }}
  >
    <div
      style={{
        textAlign: "center",
        padding: "20px 0",
        borderBottom: "1px solid #eaeaea",
      }}
    >
      <h1 style={{ color: "#333", margin: "0", fontSize: "24px" }}>
        Xplora Cancun
      </h1>
    </div>
    <div
      style={{
        padding: "30px 20px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          color: "#333",
          marginTop: "0",
          marginBottom: "20px",
          fontSize: "20px",
        }}
      >
        Olá, {firstName}!
      </h2>
      <p
        style={{
          marginBottom: "20px",
          fontSize: "16px",
          lineHeight: "1.6",
          color: "#333",
        }}
      >
        Este é um email de teste enviado pelo Resend para verificar a
        configuração do serviço de email.
      </p>
      <p
        style={{
          marginBottom: "20px",
          fontSize: "16px",
          lineHeight: "1.6",
          color: "#333",
        }}
      >
        Se você está vendo este email, a configuração foi bem-sucedida!
      </p>
      <a
        href="https://xploracancun.com.mx"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          backgroundColor: "#3b82f6",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          margin: "20px 0",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        Visitar Site
      </a>
    </div>
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        fontSize: "12px",
        color: "#888",
        borderTop: "1px solid #eaeaea",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} Xplora Cancun. Todos os direitos
        reservados.
      </p>
      <p>Este é um email automático, por favor não responda.</p>
    </div>
  </div>
);
