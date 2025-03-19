'use client'

import { useState, useCallback } from 'react';
import { getCloudinarySignature } from '@/app/actions/utils/cloudinarySignature';

export function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadToCloudinary = useCallback(async (file, options = {}) => {
    if (!file) {
      throw new Error("Arquivo é obrigatório");
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      // 1. Obter assinatura do servidor
      const formData = new FormData();
      formData.append("folder", options.folder || "uploads");
      formData.append("resource_type", options.resource_type || "auto");
      
      if (options.tags) {
        formData.append("tags", JSON.stringify(options.tags));
      }
      
      if (options.transformation) {
        formData.append("transformation", options.transformation);
      }

      const signatureResult = await getCloudinarySignature({}, formData);

      if (!signatureResult.success) {
        throw new Error(signatureResult.errors?._form || "Falha ao obter assinatura");
      }

      // 2. Fazer upload para o Cloudinary
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("api_key", signatureResult.apiKey);
      uploadFormData.append("timestamp", signatureResult.timestamp);
      uploadFormData.append("signature", signatureResult.signature);
      uploadFormData.append("folder", signatureResult.folder);

      // Adicionar outras opções se existirem
      Object.entries(signatureResult).forEach(([key, value]) => {
        if (!["signature", "timestamp", "apiKey", "cloudName"].includes(key)) {
          uploadFormData.append(key, value);
        }
      });

      // Usar XMLHttpRequest para acompanhar o progresso
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            setProgress(percentComplete);
          }
        });
        
        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } else {
            reject(new Error(`Erro no upload: ${xhr.status} ${xhr.statusText}`));
          }
        });
        
        xhr.addEventListener("error", () => {
          reject(new Error("Erro de rede durante o upload"));
        });
        
        xhr.open("POST", `https://api.cloudinary.com/v1_1/${signatureResult.cloudName}/${options.resource_type || 'auto'}/upload`);
        xhr.send(uploadFormData);
      });
    } catch (error) {
      setError(error.message || "Erro ao fazer upload");
      throw error;
    } finally {
      setUploading(false);
    }
  }, []);

  const uploadMultiple = useCallback(async (files, options = {}) => {
    if (!files || files.length === 0) {
      return [];
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const results = [];
      let completed = 0;

      for (const file of files) {
        const result = await uploadToCloudinary(file, options);
        results.push(result);

        completed++;
        setProgress(Math.round((completed / files.length) * 100));
      }

      return results;
    } catch (error) {
      setError(error.message || "Erro ao fazer upload múltiplo");
      throw error;
    } finally {
      setUploading(false);
    }
  }, [uploadToCloudinary]);

  return {
    uploadToCloudinary,
    uploadMultiple,
    uploading,
    progress,
    error,
    setError
  };
}