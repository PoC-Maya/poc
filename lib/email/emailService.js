import nodemailer from "nodemailer";

/**
 * Envia um email usando o Zoho Mail
 * @param {Object} options - Opções do email
 * @param {string} options.to - Destinatário
 * @param {string} options.subject - Assunto
 * @param {string} options.text - Versão texto do email
 * @param {string} options.html - Versão HTML do email
 * @param {string} [options.from] - Remetente (opcional, usa o padrão se não fornecido)
 * @returns {Promise} - Promessa com o resultado do envio
 */
export async function sendEmail({ to, subject, text, html, from }) {
  try {
    // Configuração do transportador de email
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,
      secure: false, // true para 465, false para outras portas
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Armazenar a senha em variável de ambiente
      },
    });

    const mailOptions = {
      from: from || '"Xplora Cancun" <no-reply@xploracancun.com.mx>',
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return { success: false, error: error.message };
  }
}
