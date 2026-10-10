'use client';

import { motion } from 'framer-motion';
import { Upload, Plus, Loader2, CheckCircle2, X } from 'lucide-react';
import type { FileUploadZoneProps } from '@/types';

const FileUploadZone = ({
  uploadedFiles,
  uploadingFiles,
  onFileChange,
  onRemove,
  maxFiles = 5,
}: FileUploadZoneProps) => (
  <div className="space-y-3">
    {uploadedFiles.length < maxFiles && (
      <div
        className="relative border-2 border-dashed border-[#E9DCAE] rounded-xl p-6 md:p-8 bg-[#FBF6E6] flex flex-col items-center justify-center transition-all hover:border-primary group cursor-pointer"
        onClick={() => document.getElementById('support-file-upload')?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files) onFileChange(e.dataTransfer.files);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && document.getElementById('support-file-upload')?.click()}
      >
        <input
          type="file"
          id="support-file-upload"
          className="hidden"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
          onChange={(e) => e.target.files && onFileChange(e.target.files)}
        />
        <div className="bg-white/50 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
          <Upload className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm font-bold text-navy mb-1">Drop files here or click to upload</p>
        <p className="text-[11px] text-gray-500 text-center">
          PDF, DOC, DOCX, JPG, PNG, ZIP — Max 10MB each, up to {maxFiles} files
        </p>
      </div>
    )}

    {Object.entries(uploadingFiles).map(([id, file]) => (
      <div key={id} className="bg-white border border-[#E9DCAE] rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0" />
            <span className="text-xs font-medium text-navy truncate">{file.name}</span>
          </div>
          <span className="text-[10px] font-bold text-primary">{file.progress}%</span>
        </div>
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${file.progress}%` }}
            className="h-full bg-primary"
          />
        </div>
      </div>
    ))}

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {uploadedFiles.map((file, index) => (
        <div key={index} className="flex items-center justify-between bg-white border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-navy truncate">{file.name}</span>
              <span className="text-[10px] text-gray-400">{file.size}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-1 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-colors"
            aria-label={`Remove ${file.name}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>

    {uploadedFiles.length > 0 && uploadedFiles.length < maxFiles && (
      <button
        type="button"
        onClick={() => document.getElementById('support-file-upload')?.click()}
        className="flex items-center gap-2 text-primary text-xs font-bold hover:underline transition-all"
      >
        <Plus className="w-4 h-4" /> Add More Files
      </button>
    )}
  </div>
);

export default FileUploadZone;
