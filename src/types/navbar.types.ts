// src/types/navbar.ts

export interface NavItem {
  key?: string;
  title: string | { uz?: string; ru?: string; en?: string };
  href?: string;
  description?: string | { uz?: string; ru?: string; en?: string };
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