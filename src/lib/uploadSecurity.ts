import type { UploadedFile } from '@/types';

const CLOUDINARY_HOST = 'res.cloudinary.com';
const CLOUDINARY_CLOUD_NAME = 'dn4pxyo3b';
const MAX_FILES = 5;
const MAX_FILE_NAME_LENGTH = 180;

export function isAllowedUploadUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      url.hostname === CLOUDINARY_HOST &&
      url.pathname.startsWith(`/${CLOUDINARY_CLOUD_NAME}/`)
    );
  } catch {
    return false;
  }
}

export function sanitizeUploadedFiles(files: UploadedFile[] | undefined): UploadedFile[] {
  if (!Array.isArray(files)) return [];

  return files
    .slice(0, MAX_FILES)
    .filter((file): file is UploadedFile => {
      return Boolean(
        file &&
        typeof file.name === 'string' &&
        file.name.trim().length > 0 &&
        file.name.length <= MAX_FILE_NAME_LENGTH &&
        typeof file.url === 'string' &&
        isAllowedUploadUrl(file.url) &&
        typeof file.size === 'string' &&
        file.size.length <= 40
      );
    })
    .map((file) => ({
      name: file.name.trim(),
      url: file.url,
      size: file.size,
    }));
}
