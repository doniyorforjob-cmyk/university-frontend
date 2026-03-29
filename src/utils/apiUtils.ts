export const getImageUrl = (path?: any | null): string => {
    if (!path || typeof path !== 'string') return '/images/logo.png';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;

    // Get base URL from env, removing /api suffix if present
    const apiBase = process.env.REACT_APP_API_BASE_URL || 'https://new.namdtu.uz';
    const baseUrl = apiBase.replace(/\/api\/?$/, '');

    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${baseUrl}${normalizedPath}`;
};

export const getLocalized = (value: any, locale: string = 'uz'): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);

    if (Array.isArray(value)) {
        return value.map(item => getLocalized(item, locale)).filter(Boolean).join(', ');
    }

    if (typeof value === 'object') {
        const targetLocale = locale || 'uz';
        // Handle localized objects {uz: '...', ru: '...', en: '...'}
        if (value[targetLocale] || value['uz'] || value['ru'] || value['en']) {
            return value[targetLocale] || value['uz'] || value['ru'] || value['en'] || '';
        }

        const fields = value.fields || {};
        const nameVal = fields.name || fields.title || value.name || value.title;

        if (nameVal) {
            return getLocalized(nameVal, locale);
        }

        return value.uuid || value.id || '';
    }
    return String(value);
};

export const toString = getLocalized;

export const normalizeCertificates = (fields: any): Array<{ name: string; url: string }> => {
    // Check possible field names
    const raw = fields.certificate || fields.certificates || fields.sertifikatlar || fields.sertifikat || [];
    const items = Array.isArray(raw) ? raw : [raw].filter(Boolean);

    return items.map((item: any) => {
        if (typeof item === 'string') {
            return { name: 'Certificate', url: getImageUrl(item) };
        }
        if (item && typeof item === 'object') {
            const url = item.url || item.thumbnail_url || item.path || '';
            const name = item.name || item.title || item.original_name || 'Certificate';
            return { name, url: getImageUrl(url) };
        }
        return null;
    }).filter((i: any): i is { name: string; url: string } => i !== null && !!i.url);
};




