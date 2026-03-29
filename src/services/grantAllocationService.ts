import {
    fetchGrantAllocations as httpFetchGrantAllocations,
    getGrantAllocationBySlug as httpGetGrantAllocationBySlug
} from '../api/http/grantAllocation.http';

export const fetchGrantAllocations = httpFetchGrantAllocations;
export const getGrantAllocationBySlug = httpGetGrantAllocationBySlug;
