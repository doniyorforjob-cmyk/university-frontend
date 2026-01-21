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
  content?: string;
  gallery?: string[];
  directionsAndSpecializations?: string;
  internationalCooperation?: string;
  uuid?: string;
  deanInfo?: import('./leadership.types').Leadership;
}

export type Department = {
  id: string | number;
  name: string;
  phone?: string;
  email?: string;
  headName?: string;
  slug?: string;
  facultyId?: string | number;
  // Additional info
  image?: string;
  description?: string;
  content?: string;
  gallery?: string[];
  directions?: string;
  history?: string;
  staff?: string;
  scientificActivity?: string;
  internationalCooperation?: string;
  headInfo?: import('./leadership.types').Leadership;
}
