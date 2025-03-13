// lib/validations.js
export function validateWithSchema(schema, formData) {
  try {
    // Transformar FormData em objeto
    const rawData = {};
    for (const [key, value] of formData.entries()) {
      rawData[key] = value;
    }

    // Validar com o esquema Zod
    const result = schema.safeParse(rawData);

    if (!result.success) {
      // Formatar erros do Zod para uso no formulário
      const errors = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });

      return { success: false, errors };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return {
      success: false,
      error: {
        message: `Erro na validação: ${error.message}`,
      },
    };
  }
}
