import type { ApiResponse, ContactFormData, SupportRequestFormData } from '@/types';

async function request<T extends ApiResponse>(
  endpoint: string,
  data: ContactFormData | SupportRequestFormData
): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = (await response.json()) as ApiResponse;

  if (!response.ok) {
    throw new Error(!result.success ? result.error : 'Request failed');
  }

  return result as T;
}

export const sendContactEmail = (data: ContactFormData) =>
  request<Extract<ApiResponse, { success: true }>>('/api/contact', data);

export const sendSupportRequestEmail = (data: SupportRequestFormData) =>
  request<Extract<ApiResponse, { success: true }>>('/api/support-request', data);
