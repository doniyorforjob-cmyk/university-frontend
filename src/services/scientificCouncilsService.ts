import {
    fetchScientificCouncils as httpFetchScientificCouncils,
    getScientificCouncilBySlug as httpGetScientificCouncilBySlug
} from '../api/http/scientificCouncils.http';

export const fetchScientificCouncils = httpFetchScientificCouncils;
export const getScientificCouncilBySlug = httpGetScientificCouncilBySlug;
