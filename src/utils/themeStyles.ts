import { ThemeMode } from '../types';

export interface ThemeStyles {
  id: ThemeMode;
  name: string;
  bodyClass: string;
  cardClass: string;
  cardHoverClass: string;
  accentBadge: string;
  accentButton: string;
  accentText: string;
  borderSubtle: string;
  headerBackground: string;
  glowColor: string;
}

export const THEMES: Record<ThemeMode, ThemeStyles> = {
  dark: {
    id: 'dark',
    name: 'Escuro Clássico',
    bodyClass: 'bg-neutral-950 text-neutral-100',
    cardClass: 'bg-neutral-900/80 border-neutral-800 text-neutral-100',
    cardHoverClass: 'hover:border-indigo-500/50 hover:bg-neutral-850',
    accentBadge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    accentButton: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20',
    accentText: 'text-indigo-400',
    borderSubtle: 'border-neutral-800',
    headerBackground: 'from-indigo-950/40 via-neutral-950 to-neutral-950',
    glowColor: 'rgba(99, 102, 241, 0.15)'
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Blue',
    bodyClass: 'bg-slate-950 text-slate-100',
    cardClass: 'bg-slate-900/80 border-slate-800 text-slate-100',
    cardHoverClass: 'hover:border-sky-400/50 hover:bg-slate-850',
    accentBadge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    accentButton: 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-500/20',
    accentText: 'text-sky-400',
    borderSubtle: 'border-slate-800',
    headerBackground: 'from-sky-950/40 via-slate-950 to-slate-950',
    glowColor: 'rgba(14, 165, 233, 0.15)'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Dark',
    bodyClass: 'bg-zinc-950 text-zinc-100',
    cardClass: 'bg-zinc-900/80 border-zinc-800 text-zinc-100',
    cardHoverClass: 'hover:border-emerald-500/50 hover:bg-zinc-850',
    accentBadge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    accentButton: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20',
    accentText: 'text-emerald-400',
    borderSubtle: 'border-zinc-800',
    headerBackground: 'from-emerald-950/35 via-zinc-950 to-zinc-950',
    glowColor: 'rgba(16, 185, 129, 0.15)'
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset Glow',
    bodyClass: 'bg-stone-950 text-stone-100',
    cardClass: 'bg-stone-900/80 border-stone-800 text-stone-100',
    cardHoverClass: 'hover:border-amber-500/50 hover:bg-stone-850',
    accentBadge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    accentButton: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/20',
    accentText: 'text-amber-400',
    borderSubtle: 'border-stone-800',
    headerBackground: 'from-amber-950/30 via-stone-950 to-stone-950',
    glowColor: 'rgba(245, 158, 11, 0.15)'
  },
  light: {
    id: 'light',
    name: 'Clean Light',
    bodyClass: 'bg-slate-50 text-slate-900',
    cardClass: 'bg-white border-slate-200 text-slate-900 shadow-sm',
    cardHoverClass: 'hover:border-indigo-400 hover:shadow-md',
    accentBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accentButton: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20',
    accentText: 'text-indigo-600',
    borderSubtle: 'border-slate-200',
    headerBackground: 'from-indigo-100/50 via-slate-50 to-slate-50',
    glowColor: 'rgba(99, 102, 241, 0.08)'
  }
};
