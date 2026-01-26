import {
    fetchCulturalEvents as httpFetchCulturalEvents,
    getCulturalEventBySlug as httpGetCulturalEventBySlug
} from '../api/http/culturalEvents.http';

export const fetchCulturalEvents = httpFetchCulturalEvents;
export const getCulturalEventBySlug = httpGetCulturalEventBySlug;
