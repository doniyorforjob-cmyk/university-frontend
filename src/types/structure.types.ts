export interface Member {
  id: number;
  name: string;
  position: string;
  imageUrl: string;
  phone?: string;
  email?: string;
}

export interface Department {
  id: number;
  title: string;
  members: Member[];
}