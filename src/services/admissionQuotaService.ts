import {
    fetchAdmissionQuotas as httpFetchAdmissionQuotas,
    getAdmissionQuotaBySlug as httpGetAdmissionQuotaBySlug
} from '../api/http/admissionQuota.http';

export const fetchAdmissionQuotas = httpFetchAdmissionQuotas;
export const getAdmissionQuotaBySlug = httpGetAdmissionQuotaBySlug;
