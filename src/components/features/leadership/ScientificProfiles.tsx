import React from 'react';
import { Leadership } from '@/types/leadership.types';
import { getImageUrl } from '@/utils/apiUtils';

const ScopusIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#E9711C" />
        <path d="M7 17V7H9.5C10.8807 7 12 8.11929 12 9.5C12 10.2961 11.6288 11.0055 11.0534 11.4655C11.6288 11.9255 12 12.6349 12 13.431V13.5C12 14.8807 10.8807 16 9.5 16H8.5V17H7ZM8.5 11H9.5C10.3284 11 11 10.3284 11 9.5C11 8.67157 10.3284 8 9.5 8H8.5V11ZM8.5 15H9.5C10.3284 15 11 14.3284 11 13.5C11 12.6716 10.3284 12 9.5 12H8.5V15Z" fill="white" />
        <path d="M15.5 15.5C14.1193 15.5 13 14.3807 13 13V12.5C13 11.1193 14.1193 10 15.5 10C16.8807 10 18 11.1193 18 12.5V13H16.5V12.5C16.5 11.9477 16.0523 11.5 15.5 11.5C14.9477 11.5 14.5 11.9477 14.5 12.5V13C14.5 13.5523 14.9477 14 15.5 14C16.0523 14 16.5 13.5523 16.5 13V12.5H18V13C18 14.3807 16.8807 15.5 15.5 15.5Z" fill="white" />
    </svg>
);

const WoSIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#000" strokeWidth="0.5" fill="#fff" />
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#3B82F6" />
        <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 10.61 17.53 9.32 16.74 8.28L15.3 9.72C15.75 10.4 16 11.17 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C12.83 8 13.6 8.25 14.28 8.7L15.72 7.26C14.68 6.47 13.39 6 12 6Z" fill="#10B981" />
        <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 11.45 13.78 10.95 13.41 10.59L14.82 9.18C15.56 9.92 16 10.9 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C13.1 8 14.08 8.44 14.82 9.18L13.41 10.59C13.05 10.22 12.55 10 12 10Z" fill="#000000" />
    </svg>
);

const OrcidIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#A6CE39" />
        <path d="M10.15 15.75H8.8V8.25H10.15V15.75ZM9.475 7.625C9.05 7.625 8.7 7.275 8.7 6.85C8.7 6.425 9.05 6.075 9.475 6.075C9.9 6.075 10.25 6.425 10.25 6.85C10.25 7.275 9.9 7.625 9.475 7.625ZM11.45 8.25H14.15C16.1 8.25 17.15 9.5 17.15 11.425C17.15 13.35 16.1 14.6 14.15 14.6H11.45V8.25ZM12.8 13.45H14.075C15.225 13.45 15.8 12.775 15.8 11.425C15.8 10.075 15.225 9.4 14.075 9.4H12.8V13.45Z" fill="white" />
    </svg>
);

const ScholarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9M7 14.27V17L12 20L17 17V14.27L12 17L7 14.27Z" fill="#4285F4" />
    </svg>
);

const ResearchGateIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#00CCBB" />
        <path d="M8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12ZM14.5 12C14.5 10.62 13.38 9.5 12 9.5C10.62 9.5 9.5 10.62 9.5 12C9.5 13.38 10.62 14.5 12 14.5C13.38 14.5 14.5 13.38 14.5 12ZM15.5 15.5L17 17M13 14.5L12 12L13 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

interface ScientificProfileLinkProps {
    name: string;
    icon: React.ReactNode;
    url?: string;
}

const ScientificProfileLink: React.FC<ScientificProfileLinkProps> = ({ name, icon, url }) => {
    return (
        <a
            href={url ? getImageUrl(url) : '#'}
            target={url ? "_blank" : undefined}
            rel="noopener noreferrer"
            onClick={(e) => !url && e.preventDefault()}
            className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group cursor-pointer"
        >
            <div className="flex-shrink-0 transition-transform group-hover:scale-110">
                {icon}
            </div>
            <span className="text-[15px] font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                {name}
            </span>
        </a>
    );
};

interface ScientificProfilesProps {
    member: Leadership;
}

const ScientificProfiles: React.FC<ScientificProfilesProps> = ({ member }) => {
    const scopusUrl = member.scopus_url || member.fields?.['scopus-url'];
    const wosUrl = member.wos_url || member.fields?.['wos-url'];
    const scholarUrl = member.scholar_url || member.fields?.['scholar-url'] || member.google_scholar_id;
    const researchgateUrl = member.researchgate_url || member.fields?.['researchgate-url'];
    const orcidUrl = member.orcid_url || member.fields?.['orcid-url'];

    const hasAnyProfile = !!(scopusUrl || wosUrl || scholarUrl || researchgateUrl || orcidUrl);

    if (!hasAnyProfile) return null;

    return (
        <div className="col-span-1 md:col-span-2 space-y-3 pt-2">
            <div className="flex flex-wrap gap-2.5">
                {scopusUrl && (
                    <ScientificProfileLink
                        name="Scopus"
                        icon={<ScopusIcon />}
                        url={scopusUrl}
                    />
                )}
                {wosUrl && (
                    <ScientificProfileLink
                        name="Web of Science"
                        icon={<WoSIcon />}
                        url={wosUrl}
                    />
                )}
                {scholarUrl && (
                    <ScientificProfileLink
                        name="Google Scholar"
                        icon={<ScholarIcon />}
                        url={scholarUrl}
                    />
                )}
                {researchgateUrl && (
                    <ScientificProfileLink
                        name="ResearchGate"
                        icon={<ResearchGateIcon />}
                        url={researchgateUrl}
                    />
                )}
                {orcidUrl && (
                    <ScientificProfileLink
                        name="ORCID"
                        icon={<OrcidIcon />}
                        url={orcidUrl}
                    />
                )}
            </div>
        </div>
    );
};

export default ScientificProfiles;
