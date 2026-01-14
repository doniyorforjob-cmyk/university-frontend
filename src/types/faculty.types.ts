// Faculty interfeysi
export type Faculty = {
  id: string | number;
  name: string;
  icon?: any;               // agar icon komponent ishlatilsa
  color?: string;
  shortDescription?: string;
  image?: string;
  iconImage?: string;
  dean?: string;
  slug?: string;
  // Dean information
  deanName?: string;
  deanPosition?: string;
  deanPhone?: string;
  deanEmail?: string;
  deanImage?: string;
  // Additional info
  description?: string;
}

export type Department = {
  id: string | number;
  name: string;
  phone?: string;
  email?: string;
  headName?: string;
  slug?: string;
  facultyId?: string | number;
}
