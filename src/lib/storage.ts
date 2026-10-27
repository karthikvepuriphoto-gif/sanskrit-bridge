import { WORDS } from '../data/words';

export type Lang = 'en' | 'hi' | 'te';
export type Rating = 'again' | 'good' | 'easy';

export interface Progress {
  onboarded: boolean;
  languages: Lang[];
  ratings: Record<string, Rating>;
  /** High-water mark: the next new card index. */
  cursor: number;
  streak: number;
  lastStudyDate: string | null;
  listenCount: number;
  xp: number;
  sound: boolean;
}

export const STORAGE_KEY = 'shabda-bridge.progress.v1';
const DB_NAME = 'shabda-bridge';
const STORE = 'kv';
const IDB_KEY = 'progress';

const XP: Record<Rating, number> = { again: 5, good: 10, easy: 15 };
const WORD_IDS = new Set(WORDS.map((word) => word.id));
const RATINGS = new Set<Rating>(['again', 'good', 'easy']);

export function defaultProgress(): Progress {
  return {
    onboarded: false,
    languages: [],
    ratings: {},
    cursor: 0,
    streak: 0,
    lastStudyDate: null,
    listenCount: 0,
    xp: 0,
    sound: true,
  };
}

export function todayISO(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function previousDay(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  date.setDate(date.getDate() - 1);
  return todayISO(date);
}

function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'hi' || value === 'te';
}

function cleanLanguages(value: unknown): Lang[] {
  if (!Array.isArray(value)) return [];
  const out: Lang[] = [];
  for (const item of value) {
    if (isLang(item) && !out.includes(item)) out.push(item);
  }
  return out;
}

function cleanDate(value: unknown): string | null {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  return value;
}

function cleanCount(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return 0;
  return Math.floor(value);
}

export function sanitize(value: unknown): Progress {
  const base = defaultProgress();
  if (!value || typeof value !== 'object') return base;
  const raw = value as Partial<Progress>;
  const ratings: Record<string, Rating> = {};
  if (raw.ratings && typeof raw.ratings === 'object') {
    for (const [id, rating] of Object.entries(raw.ratings)) {
      if (WORD_IDS.has(id) && RATINGS.has(rating)) ratings[id] = rating;
    }
  }
  return {
    onboarded: raw.onboarded === true,
    languages: cleanLanguages(raw.languages),
    ratings,
    cursor: Math.min(WORDS.length, cleanCount(raw.cursor)),
    streak: cleanCount(raw.streak),
    lastStudyDate: cleanDate(raw.lastStudyDate),
    listenCount: cleanCount(raw.listenCount),
    xp: cleanCount(raw.xp),
    sound: raw.sound !== false,
  };
}

export function touchStudy(progress: Progress, today: string): Progress {
  if (progress.lastStudyDate === today) return progress;
  const streak = progress.lastStudyDate === previousDay(today) ? progress.streak + 1 : 1;
  return { ...progress, streak, lastStudyDate: today };
}

export function applyRating(
  progress: Progress,
  wordId: string,
  rating: Rating,
  index: number,
  today: string,
): Progress {
  const studied = touchStudy(progress, today);
  const previous = studied.ratings[wordId];
  const delta = XP[rating] - (previous ? XP[previous] : 0);
  return {
    ...studied,
    ratings: { ...studied.ratings, [wordId]: rating },
    cursor: Math.max(studied.cursor, Math.min(WORDS.length, index + 1)),
    xp: Math.max(0, studied.xp + delta),
  };
}

export function applyListen(progress: Progress, today: string): Progress {
  const studied = touchStudy(progress, today);
  return { ...studied, listenCount: studied.listenCount + 1 };
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return sanitize(JSON.parse(raw));
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress: Progress): void {
  const safe = sanitize(progress);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
  } catch {
    /* Private mode can refuse the write. The session still works in memory. */
  }
  void mirrorProgress(safe);
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) {
        request.result.createObjectStore(STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/** Stub mirror for a later IndexedDB-first scheduler. localStorage is the prototype store. */
export async function mirrorProgress(progress: Progress): Promise<void> {
  if (typeof indexedDB === 'undefined') return;
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(progress, IDB_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    /* The mirror is optional in this prototype. */
  }
}

export async function readMirroredProgress(): Promise<Progress | null> {
  if (typeof indexedDB === 'undefined') return null;
  try {
    const db = await openDb();
    const value = await new Promise<unknown>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const request = tx.objectStore(STORE).get(IDB_KEY);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    db.close();
    if (!value) return null;
    return sanitize(value);
  } catch {
    return null;
  }
}

export async function clearMirroredProgress(): Promise<void> {
  if (typeof indexedDB === 'undefined') return;
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(IDB_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    /* ignore */
  }
}
