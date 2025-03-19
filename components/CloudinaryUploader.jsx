'use client'

import { useState, useRef } from 'react';
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';

export default function CloudinaryUploader({ 
  folder = "uploads", 
  onUploadComplete, 
  isMultiple = false, 
  fieldName,
  resourceType = "auto"
}) {
  const [files, setFiles] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const fileInputRef = useRef(null);
  
  const { 
    uploadToCloudinary, 
    uploadMultiple, 
    uploading, 
    progress, 
    error, 
    setError 
  } = useCloudinaryUpload();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setError(null);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Selecione pelo menos um arquivo");
      return;
    }

    try {
      let results;
      
      if (isMultiple) {
        results = await uploadMultiple(files, { folder, resource_type: resourceType });
        const urls = results.map(result => result.secure_url);
        setUploadedUrls(urls);
        
        if (onUploadComplete) {
          onUploadComplete(urls, fieldName);
        }
      } else {
        const result = await uploadToCloudinary(files[0], { folder, resource_type: resourceType });
        setUploadedUrls([result.secure_url]);
        
        if (onUploadComplete) {
          onUploadComplete(result.secure_url, fieldName);
        }
      }

      // Limpar estado
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Erro no upload:", error);
    }
  };

  return (
    <div className="w-full p-3 border rounded bg-blue-50">
      <div className="mb-2">
        <input
          type="file"
          ref={fileInputRef}
          multiple={isMultiple}
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                     file:rounded file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700"
        />
      </div>

      {files.length > 0 && <div className="mb-2 text-xs text-gray-600">{files.length} arquivo(s) selecionado(s)</div>}

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
        disabled={files.length === 0 || uploading}
        className="w-full py-1 px-3 text-sm bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {uploading ? "Enviando..." : "Fazer Upload"}
      </button>

      {uploadedUrls.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-medium text-gray-700">URLs das imagens:</p>
          <div className="mt-1 text-xs bg-white p-2 rounded overflow-x-auto">
            {uploadedUrls.map((url, index) => (
              <div key={index} className="mb-1 break-all">
                {url}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}