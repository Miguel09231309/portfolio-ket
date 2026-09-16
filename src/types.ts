export type ThemeMode = 'dark' | 'light' | 'midnight' | 'emerald' | 'sunset';

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  label?: string;
}

export interface PortfolioCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface PortfolioLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  categoryId: string;
  icon?: string;
  featured?: boolean;
  badge?: string;
  tags?: string[];
  image?: string;
  clicks?: number;
}

export interface ProfileInfo {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  location: string;
  email: string;
  availableForWork: boolean;
  statusText: string;
  socialLinks: SocialLink[];
}

export interface PortfolioConfig {
  profile: ProfileInfo;
  categories: PortfolioCategory[];
  links: PortfolioLink[];
  theme: ThemeMode;
  layoutStyle?: 'cards' | 'compact';
}
