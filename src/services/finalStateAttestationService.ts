import { fetchFinalStateAttestationData, FinalStateAttestationEntry } from '../api/http/final-state-attestation.http';

export const getFinalStateAttestation = async (locale?: string): Promise<FinalStateAttestationEntry | null> => {
    return fetchFinalStateAttestationData(locale);
};

export type { FinalStateAttestationEntry };
