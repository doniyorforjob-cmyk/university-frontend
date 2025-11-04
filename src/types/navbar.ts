// src/types/navbar.ts

export interface NavItem {
  id: string;           // Yangi qo'shildi
  title: string;
  href?: string;
  description?: string;
  children?: NavItem[];
  specialLayout?: 'structure' | null;
}

export interface SocialLink {
  name: string;
  href: string;
  iconD: string;
}

export interface QuickLink {
  title: string;
  href: string;
}

export interface NewsItem {
  id: number;
  text: string;
  date: string;
  description: string;
  image: string;
}