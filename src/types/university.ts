/**
 * @fileoverview Universitet sahifasi uchun ishlatiladigan TypeScript interfeyslari.
 */

export interface UniversityReason {
  id: number;
  title: string;
  description: string;
  color: string;
  items?: string[];
}

export interface UniversityContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  reasons: UniversityReason[];
  welcomeTitle: string;
  welcomeDescription: string;
  welcomeCallToAction: string;
}