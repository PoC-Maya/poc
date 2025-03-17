import { v2 as cloudinary } from 'cloudinary';

// Configurar o Cloudinary com as credenciais
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Gera uma assinatura para upload direto no cliente
 * @param {Object} options - Opções para o upload (folder, etc)
 * @returns {Object} - Dados necessários para upload direto
 */
export function generateUploadSignature(options = {}) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  const uploadParams = {
    timestamp,
    folder: options.folder || 'uploads',
    ...options
  };
  
  // Gerar a assinatura
  const signature = cloudinary.utils.api_sign_request(
    uploadParams,
    process.env.CLOUDINARY_API_SECRET
  );
  
  return {
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    ...uploadParams
  };
}

/**
 * Extrai o public_id de uma URL do Cloudinary
 * @param {string} url - URL da imagem do Cloudinary
 * @returns {string|null} - public_id extraído ou null
 */
export function extractCloudinaryPublicId(url) {
  try {
    if (!url || typeof url !== 'string') return null;
    
    console.log(`Tentando extrair public_id da URL: ${url}`);
    
    // Método direto para URLs do formato padrão do Cloudinary
    // Exemplo: https://res.cloudinary.com/dwcfow7xv/image/upload/v1234567890/blog/jlnwkeeogqw4fmoowt8x.jpg
    const regex = /\/image\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/;
    const match = url.match(regex);
    
    if (match && match[1]) {
      console.log(`Public ID extraído (método 1): ${match[1]}`);
      return match[1];
    }
    
    // Método alternativo para URLs que podem não seguir o padrão exato
    // Tenta extrair o caminho após /upload/
    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex !== -1) {
      const afterUpload = url.substring(uploadIndex + 8); // +8 para pular '/upload/'
      
      // Remover versão se existir
      const withoutVersion = afterUpload.replace(/^v\d+\//, '');
      
      // Remover extensão do arquivo se existir
      const withoutExtension = withoutVersion.replace(/\.[^/.]+$/, '');
      
      console.log(`Public ID extraído (método 2): ${withoutExtension}`);
      return withoutExtension;
    }
    
    // Se os métodos acima falharem, tentar extrair diretamente do URL
    // Assumindo que o public_id está no formato folder/filename
    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1].split('.')[0]; // Remove extensão
    const secondLastPart = urlParts[urlParts.length - 2];
    
    if (secondLastPart && lastPart && !['image', 'upload', 'v1', 'v2'].includes(secondLastPart)) {
      const publicId = `${secondLastPart}/${lastPart}`;
      console.log(`Public ID extraído (método 3): ${publicId}`);
      return publicId;
    }
    
    // Se tudo falhar, usar o último segmento do caminho sem extensão
    if (lastPart) {
      console.log(`Public ID extraído (método 4, fallback): ${lastPart}`);
      return lastPart;
    }
    
    console.log(`Não foi possível extrair o public_id da URL: ${url}`);
    return null;
  } catch (error) {
    console.error("Erro ao extrair public_id do Cloudinary:", error);
    return null;
  }
}

/**
 * Deleta uma imagem do Cloudinary usando seu public_id ou URL
 * @param {string} publicIdOrUrl - public_id ou URL completa da imagem
 * @returns {Promise<Object>} - Resultado da operação de exclusão
 */
export async function deleteCloudinaryImage(publicIdOrUrl) {
  try {
    // Se já for um public_id (não começa com http), usar diretamente
    if (!publicIdOrUrl.startsWith('http')) {
      console.log(`Usando public_id direto: ${publicIdOrUrl}`);
      const result = await cloudinary.uploader.destroy(publicIdOrUrl);
      
      return {
        success: result.result === 'ok',
        publicId: publicIdOrUrl,
        result,
        error: result.result !== 'ok' ? `Falha ao excluir imagem: ${result.result}` : null
      };
    }
    
    // Se for uma URL, extrair o public_id
    const publicId = extractCloudinaryPublicId(publicIdOrUrl);
    
    if (!publicId) {
      console.warn(`Não foi possível extrair o public_id da URL: ${publicIdOrUrl}`);
      return {
        success: false,
        url: publicIdOrUrl,
        error: `Não foi possível extrair o public_id da URL`
      };
    }
    
    console.log(`Tentando excluir imagem com public_id: ${publicId}`);
    
    // Chamar a API do Cloudinary para excluir a imagem
    const result = await cloudinary.uploader.destroy(publicId);
    
    console.log(`Resultado da exclusão do Cloudinary para ${publicId}:`, result);
    
    return {
      success: result.result === 'ok',
      publicId,
      result,
      error: result.result !== 'ok' ? `Falha ao excluir imagem: ${result.result}` : null
    };
  } catch (error) {
    console.error("Erro ao excluir imagem do Cloudinary:", error);
    return {
      success: false,
      error: error.message || 'Erro desconhecido ao excluir imagem'
    };
  }
}

/**
 * Deleta múltiplas imagens do Cloudinary
 * @param {string[]} publicIdsOrUrls - Array de public_ids ou URLs
 * @returns {Promise<Object>} - Resultado da operação de exclusão em massa
 */
export async function deleteCloudinaryImages(publicIdsOrUrls) {
  if (!Array.isArray(publicIdsOrUrls) || publicIdsOrUrls.length === 0) {
    return {
      success: false,
      error: 'Nenhuma imagem fornecida para exclusão'
    };
  }
  
  const results = {
    success: true,
    total: publicIdsOrUrls.length,
    deleted: 0,
    failed: 0,
    details: []
  };
  
  for (const item of publicIdsOrUrls) {
    try {
      const result = await deleteCloudinaryImage(item);
      results.details.push(result);
      
      if (result.success) {
        results.deleted++;
      } else {
        results.failed++;
        results.success = false;
      }
    } catch (error) {
      results.failed++;
      results.success = false;
      results.details.push({
        success: false,
        item,
        error: error.message || 'Erro desconhecido'
      });
    }
  }
  
  return results;
}