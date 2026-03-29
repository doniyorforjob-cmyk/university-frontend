import { fetchMastersProgramData, MastersProgramEntry } from '../api/http/masters-program.http';

export const getMastersProgram = async (locale?: string): Promise<MastersProgramEntry | null> => {
    return fetchMastersProgramData(locale);
};

export type { MastersProgramEntry };
