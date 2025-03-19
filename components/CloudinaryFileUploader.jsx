'use client'

import { useState, useRef } from 'react'
import * as allActions from "@/app/actions";

export default function CloudinaryFileUploader({ 
  folder = "uploads", 
  onUploadComplete, 
  fieldName,
  title = "",
  description = ""
}) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [uploadedUrl, setUploadedUrl] = useState(null)
  const [fileTitle, setFileTitle] = useState(title)
  const [fileDescription, setFileDescription] = useState(description)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0])
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Selecione um arquivo")
      return
    }

    if (!fileTitle.trim()) {
      setError("O título é obrigatório")
      return
    }

    if (!fileDescription.trim()) {
      setError("A descrição é obrigatória")
      return
    }

    setUploading(true)
    setProgress(0)
    setError(null)

    try {
      // 1. Obter assinatura do servidor
      const signatureFormData = new FormData();
      signatureFormData.append("folder", folder);

      const cloudinarySignatureAction =   allActions.getCloudinarySignature;

      if (!cloudinarySignatureAction) {
        throw new Error("Action de assinatura do Cloudinary não encontrada");
      }

      const signatureResult = await cloudinarySignatureAction({}, signatureFormData);
      
      console.log("Resultado da assinatura:", signatureResult);

      if (!signatureResult.success) {
        throw new Error(signatureResult.errors?._form || "Falha ao obter assinatura");
      }

      // 2. Fazer upload do arquivo
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signatureResult.apiKey);
      formData.append("timestamp", signatureResult.timestamp);
      formData.append("signature", signatureResult.signature);
      
      // Importante: adicionar EXATAMENTE os mesmos parâmetros que foram usados para gerar a assinatura
      if (signatureResult.folder) {
        formData.append("folder", signatureResult.folder);
      }
      
      // Adicionar outras opções se existirem, mas apenas as que foram usadas na assinatura
      if (signatureResult.params) {
        Object.entries(signatureResult.params).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }

      console.log("Enviando para Cloudinary com os seguintes parâmetros:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof File ? `[File: ${value.name}]` : value}`);
      }

      const response = await fetch(`https://api.cloudinary.com/v1_1/${signatureResult.cloudName}/auto/upload`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || "Erro ao fazer upload")
      }

      const uploadResult = await response.json()
      const url = uploadResult.secure_url

      setUploadedUrl(url)

      // 3. Notificar conclusão com o objeto estruturado
      if (onUploadComplete) {
        const fileData = {
          title: fileTitle,
          description: fileDescription,
          file: url
        }
        onUploadComplete(fileData, fieldName)
      }

      // 4. Limpar estado
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      return url
    } catch (error) {
      console.error("Erro no upload:", error)
      setError(error.message || "Erro ao fazer upload do arquivo")
      return null
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="w-full p-3 border rounded bg-blue-50">
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Título</label>
        <input
          type="text"
          value={fileTitle}
          onChange={(e) => setFileTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Título do arquivo"
        />
        
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <textarea
          value={fileDescription}
          onChange={(e) => setFileDescription(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Descrição do arquivo"
          rows={2}
        />
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                     file:rounded file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700"
        />
      </div>

      {file && <div className="mb-2 text-xs text-gray-600">Arquivo selecionado: {file.name}</div>}

      {uploading && (
        <div className="mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="mt-1 text-xs text-gray-500 text-center">{progress}% concluído</p>
        </div>
      )}

      {error && <div className="mb-2 text-xs text-red-600">{error}</div>}

      <button
        type="button"
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full py-1 px-3 text-sm bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {uploading ? "Enviando..." : "Fazer Upload"}
      </button>

      {uploadedUrl && (
        <div className="mt-2">
          <p className="text-xs font-medium text-gray-700">Arquivo enviado:</p>
          <div className="mt-1 text-xs bg-white p-2 rounded overflow-x-auto break-all">
            {uploadedUrl}
          </div>
        </div>
      )}
    </div>
  )
}