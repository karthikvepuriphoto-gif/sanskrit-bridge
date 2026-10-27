import type { Lang } from './storage';

const REST: Lang[] = ['hi', 'te', 'en'];

export function orderLangs(selected: Lang[]): Lang[] {
  const rest = REST.filter((lang) => !selected.includes(lang));
  return [...selected, ...rest];
}

export const LANG_META: Record<Lang, { label: string; native: string; lang: string }> = {
  en: { label: 'English', native: 'English', lang: 'en' },
  hi: { label: 'Hindi', native: 'हिन्दी', lang: 'hi' },
  te: { label: 'Telugu', native: 'తెలుగు', lang: 'te' },
};
