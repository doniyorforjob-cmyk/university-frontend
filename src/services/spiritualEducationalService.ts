import {
    fetchSpiritualActivities as httpFetchSpiritualActivities,
    getSpiritualActivityBySlug as httpGetSpiritualActivityBySlug
} from '../api/http/spiritualEducational.http';

export const fetchSpiritualActivities = httpFetchSpiritualActivities;
export const getSpiritualActivityBySlug = httpGetSpiritualActivityBySlug;
