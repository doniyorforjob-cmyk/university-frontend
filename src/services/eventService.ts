import { getEventBySlug as httpGetEventBySlug, fetchEvents as httpFetchEvents } from '../api/http/events.http';

export const getEventBySlug = httpGetEventBySlug;
export const getAllEvents = httpFetchEvents;
