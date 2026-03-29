/**
 * Tashkiliy tuzilma a'zosining ma'lumotlari
 */
export interface OrganizationalMember {
  id: string;
  name: string;
  position: string;
  type: 'rector' | 'prorector' | 'dekan' | 'kafedra_head' | 'department_head';
  faculty?: string; // fakultet nomi (dekanlar uchun)
  imageUrl?: string; // rasm URL
}

/**
 * Butun tashkiliy tuzilma ma'lumotlari
 */
export interface OrganizationalStructure {
  rector: OrganizationalMember;
  prorektors: OrganizationalMember[];
  dekans: OrganizationalMember[];
  kafedras: OrganizationalMember[];
  departments: OrganizationalMember[];
}

/**
 * PDF formatidagi tashkiliy tuzilma hujjati
 */
export interface OrganizationalStructureDoc {
  title: string;
  fileUrl: string;
}