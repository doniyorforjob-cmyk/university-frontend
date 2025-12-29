export const getImageUrl = (path?: string | null): string => {
    if (!path) return '/images/logo.png';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;

    // Get base URL from env, removing /api suffix if present
    const apiBase = process.env.REACT_APP_API_BASE_URL || 'https://new.namdtu.uz';
    const baseUrl = apiBase.replace(/\/api\/?$/, '');

    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${baseUrl}${normalizedPath}`;
};
