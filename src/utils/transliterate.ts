/**
 * Transliterate Cyrillic (Russian/Uzbek) text to Latin characters for URL-safe slugs
 */

const transliterationMap: Record<string, string> = {
    // Russian Cyrillic
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',

    // Uppercase
    'А': 'a', 'Б': 'b', 'В': 'v', 'Г': 'g', 'Д': 'd', 'Е': 'e', 'Ё': 'yo',
    'Ж': 'zh', 'З': 'z', 'И': 'i', 'Й': 'y', 'К': 'k', 'Л': 'l', 'М': 'm',
    'Н': 'n', 'О': 'o', 'П': 'p', 'Р': 'r', 'С': 's', 'Т': 't', 'У': 'u',
    'Ф': 'f', 'Х': 'kh', 'Ц': 'ts', 'Ч': 'ch', 'Ш': 'sh', 'Щ': 'shch',
    'Ъ': '', 'Ы': 'y', 'Ь': '', 'Э': 'e', 'Ю': 'yu', 'Я': 'ya',

    // Uzbek specific (Cyrillic)
    'ў': 'o', 'қ': 'q', 'ғ': 'g', 'ҳ': 'h',
    'Ў': 'o', 'Қ': 'q', 'Ғ': 'g', 'Ҳ': 'h'
};

export function transliterate(text: string): string {
    return text
        .split('')
        .map(char => transliterationMap[char] || char)
        .join('');
}

export function slugify(text: string): string {
    return transliterate(text)
        .toLowerCase()
        .replace(/['"ʻ`]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
        .replace(/^-+|-+$/g, '');
}
