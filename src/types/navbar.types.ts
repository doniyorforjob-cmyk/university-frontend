// src/types/navbar.ts

export interface NavItem {
  title: string;
  href?: string;
  children?: NavItem[];
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