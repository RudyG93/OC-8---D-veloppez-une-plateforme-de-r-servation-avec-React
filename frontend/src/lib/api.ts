export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const authHeaders = () => {
    // Extract token from document.cookie
    let token = '';
    if (typeof document !== 'undefined') {
        const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
        if (match) {
            token = decodeURIComponent(match[1]);
        }
    }
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
};