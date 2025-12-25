// src/utils/logger.ts
// Production da console xabarlarini o'chirish uchun logger utility

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
    log: (...args: any[]) => {
        if (isDevelopment) {
            console.log(...args);
        }
    },

    error: (...args: any[]) => {
        if (isDevelopment) {
            console.error(...args);
        }
    },

    warn: (...args: any[]) => {
        if (isDevelopment) {
            console.warn(...args);
        }
    },

    info: (...args: any[]) => {
        if (isDevelopment) {
            console.info(...args);
        }
    },

    debug: (...args: any[]) => {
        if (isDevelopment) {
            console.debug(...args);
        }
    }
};

// Production da barcha console metodlarini o'chirish
export const disableConsoleInProduction = () => {
    if (!isDevelopment) {
        console.log = () => { };
        console.error = () => { };
        console.warn = () => { };
        console.info = () => { };
        console.debug = () => { };
    }
};
