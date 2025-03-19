'use server'

/**
 * @description Enviar email de teste usando Resend
 * @category email
 * @inputModel {
 *   "to": "usuario@exemplo.com",
 *   "subject": "Assunto do email",
 *   "firstName": "Nome"
 * }
 */

import { EmailTemplate } from '@/components/email/template';
import { Resend } from 'resend';
import { z } from 'zod';

// Schema para validação
const schema = z.object({
  to: z.string().email("Email inválido"),
  subject: z.string().min(1, "Assunto é obrigatório"),
  firstName: z.string().default("Usuário")
});

// Inicializar o cliente Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTestEmail(prevState, formData) {
  try {
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log('Dados recebidos:', rawData);

    // Validação dos dados do formulário  
    const validation = schema.safeParse(rawData);

    // Se houver erro de validação, retorna imediatamente com os erros
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Dados validados
    const data = validation.data;
    
    // Enviar email usando Resend
    const result = await resend.emails.send({
      from: 'XploraCancun <no-reply@xploracancun.com.mx>',
      to: [data.to],
      subject: data.subject,
      react: EmailTemplate({ firstName: data.firstName }),
    });

    if (result.error) {
      console.error("Erro ao enviar email:", result.error);
      return {
        success: false,
        errors: {
          _form: "Erro ao enviar email: " + result.error.message,
        },
      };
    }

    console.log("Email enviado com sucesso:", result.data);
    return { 
      success: true,
      message: "Email enviado com sucesso!",
      data: result.data
    };

  } catch (error) {
    console.error("sendTestEmail error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao enviar email. Tente novamente.",
      },
    };
  }
}