import { API_BASE_URL, getToken } from '@/lib/api';

export interface UploadResponse {
    url: string;
    filename: string;
    size: number;
    mimetype: string;
    purpose: string | null;
    property_id: string | null;
    instructions: string;
}

/**
 * Upload une image (requiert rôle owner/admin)
 * Utilise FormData car c'est du multipart/form-data
 */
export async function uploadImage(
    file: File,
    options?: { purpose?: string; property_id?: string }
): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (options?.purpose) formData.append('purpose', options.purpose);
    if (options?.property_id) formData.append('property_id', options.property_id);

    const headers: Record<string, string> = {};
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/api/uploads/image`, {
        method: 'POST',
        headers,
        body: formData,
    });

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Erreur upload: ${response.status}`);
    }

    return response.json();
}
