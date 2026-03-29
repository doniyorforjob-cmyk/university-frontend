import { fetchScientificProjects as httpFetchScientificProjects, getScientificProjectBySlug as httpGetScientificProjectBySlug } from '../api/http/scientificProjects.http';

export const fetchScientificProjects = httpFetchScientificProjects;
export const getScientificProjectBySlug = httpGetScientificProjectBySlug;
