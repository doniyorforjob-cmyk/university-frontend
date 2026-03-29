import { fetchSustainabilityData as httpFetchSustainabilityData, SustainabilityEntry } from '../api/http/sustainability.http';

export const fetchSustainabilityData = httpFetchSustainabilityData;
export type { SustainabilityEntry };
