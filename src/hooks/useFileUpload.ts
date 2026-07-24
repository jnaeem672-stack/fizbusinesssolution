import { useState } from 'react';
import toast from 'react-hot-toast';
import type { UploadedFile, UploadingFilesMap } from '@/types';

const CLOUD_NAME = 'dn4pxyo3b';
const UPLOAD_PRESET = 'fizbs_uploads';
const ALLOWED_EXT = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'] as const;
const MAX_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 5;

interface CloudinaryUploadResponse {
  secure_url: string;
}

export function useFileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFilesMap>({});

  const uploadFile = async (file: File): Promise<void> => {
    const fileExt = file.name.split('.').pop()?.toLowerCase() ?? '';

    if (file.size > MAX_SIZE) {
      toast.error(`File ${file.name} is too large (Max 10MB)`);
      return;
    }
    if (!ALLOWED_EXT.includes(fileExt as (typeof ALLOWED_EXT)[number])) {
      toast.error('Only PDF, DOC, DOCX, JPG, JPEG, and PNG files are allowed');
      return;
    }

    const fileId = Math.random().toString(36).substring(7);
    setUploadingFiles((prev) => ({ ...prev, [fileId]: { name: file.name, progress: 0, status: 'uploading' } }));

    const progressInterval = setInterval(() => {
      setUploadingFiles((prev) => {
        if (!prev[fileId] || prev[fileId].progress >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return { ...prev, [fileId]: { ...prev[fileId], progress: prev[fileId].progress + 10 } };
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('cloud_name', CLOUD_NAME);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const resData = (await response.json()) as CloudinaryUploadResponse;
      clearInterval(progressInterval);
      setUploadingFiles((prev) => {
        const next = { ...prev };
        delete next[fileId];
        return next;
      });

      const newFile: UploadedFile = {
        name: file.name,
        url: resData.secure_url,
        size: `${(file.size / 1024).toFixed(1)} KB`,
      };

      setUploadedFiles((prev) => [...prev, newFile]);
      toast.success(`${file.name} uploaded successfully`);
    } catch {
      clearInterval(progressInterval);
      setUploadingFiles((prev) => ({ ...prev, [fileId]: { ...prev[fileId], status: 'error', progress: 0 } }));
      toast.error(`Upload failed for ${file.name}`);
    }
  };

  const handleFileChange = (files: FileList | File[]): void => {
    const fileList = Array.from(files);
    if (uploadedFiles.length + fileList.length > MAX_FILES) {
      toast.error(`Maximum ${MAX_FILES} files allowed`);
      return;
    }
    fileList.forEach((file) => {
      void uploadFile(file);
    });
  };

  const removeFile = (index: number): void => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearFiles = (): void => setUploadedFiles([]);

  return {
    uploadedFiles,
    uploadingFiles,
    handleFileChange,
    removeFile,
    clearFiles,
    maxFiles: MAX_FILES,
  };
}
