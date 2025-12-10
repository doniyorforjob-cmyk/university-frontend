import { HomeUniversitySystemsData } from '../../../api/homeApi';

// Type for the data after transformation, ready for the component
export interface TransformedUniversitySystemsData {
  title: string;
  subtitle: string;
  systems: {
    id: number;
    title: string;
    description: string;
    href: string;
    icon: string; // e.g., 'BookOpen', 'Users'
    color: string; // e.g., 'bg-blue-500'
  }[];
  quickLinks: {
    id: number;
    title: string;
    href: string;
  }[];
}

export const transformUniversitySystemsData = (
  apiData: HomeUniversitySystemsData
): TransformedUniversitySystemsData => {
  // In this case, the transformation is 1:1, but this structure allows for future logic.
  // For example, filtering, sorting, or combining fields.
  return {
    title: apiData.title,
    subtitle: apiData.subtitle,
    systems: apiData.systems.map(system => ({
      ...system,
    })),
    quickLinks: apiData.quickLinks.map(link => ({
      ...link,
    })),
  };
};
