import type { Attachment } from 'nodemailer/lib/mailer';
import type { UploadedFile } from '@/types';
import { isAllowedUploadUrl } from '@/lib/uploadSecurity';

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 12_000;

export async function buildEmailAttachments(files: UploadedFile[] = []): Promise<Attachment[]> {
  if (!files.length) return [];

  const results = await Promise.all(
    files.map(async (file): Promise<Attachment | null> => {
      if (!isAllowedUploadUrl(file.url)) {
        console.error(`Blocked untrusted attachment URL: ${file.name}`);
        return null;
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      try {
        const response = await fetch(file.url, { signal: controller.signal, redirect: 'error' });
        if (!response.ok) {
          console.error(`Attachment fetch failed (${response.status}): ${file.name}`);
          return null;
        }

        const declaredLength = Number(response.headers.get('content-length') || '0');
        if (declaredLength > MAX_ATTACHMENT_BYTES) {
          console.error(`Attachment exceeds size limit: ${file.name}`);
          return null;
        }

        const buffer = Buffer.from(await response.arrayBuffer());
        if (buffer.byteLength > MAX_ATTACHMENT_BYTES) {
          console.error(`Attachment exceeds size limit after download: ${file.name}`);
          return null;
        }

        return {
          filename: file.name,
          content: buffer,
        };
      } catch (error) {
        console.error(`Could not attach file "${file.name}":`, error);
        return null;
      } finally {
        clearTimeout(timeout);
      }
    })
  );

  return results.filter((item): item is Attachment => item !== null);
}
