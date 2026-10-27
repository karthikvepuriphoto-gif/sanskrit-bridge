import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  applyListen,
  applyRating,
  defaultProgress,
  loadProgress,
  previousDay,
  sanitize,
  saveProgress,
  STORAGE_KEY,
  todayISO,
} from './storage';

function installMemoryStorage() {
  const mem = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => mem.get(key) ?? null,
    setItem: (key: string, value: string) => {
      mem.set(key, value);
    },
    removeItem: (key: string) => {
      mem.delete(key);
    },
    clear: () => mem.clear(),
    key: (index: number) => [...mem.keys()][index] ?? null,
    get length() {
      return mem.size;
    },
  });
}

describe('progress', () => {
  beforeEach(() => {
    installMemoryStorage();
  });

  it('starts a streak on the first mark and continues it the next day', () => {
    const first = applyRating(defaultProgress(), 'daya', 'good', 1, '2026-10-27');
    expect(first.streak).toBe(1);
    expect(first.lastStudyDate).toBe('2026-10-27');
    expect(first.cursor).toBe(2);
    expect(first.xp).toBe(10);

    const sameDay = applyRating(first, 'rama', 'easy', 7, '2026-10-27');
    expect(sameDay.streak).toBe(1);
    expect(sameDay.xp).toBe(25);

    const nextDay = applyRating(sameDay, 'rama', 'good', 7, '2026-10-28');
    expect(nextDay.streak).toBe(2);
    expect(nextDay.xp).toBe(20);
    expect(previousDay('2026-10-28')).toBe('2026-10-27');
  });

  it('resets the streak after a missed day', () => {
    const first = applyRating(defaultProgress(), 'daya', 'again', 0, '2026-10-01');
    const later = applyListen(first, '2026-10-03');
    expect(later.streak).toBe(1);
    expect(later.listenCount).toBe(1);
  });

  it('drops unknown cards and round-trips through localStorage', () => {
    const dirty = sanitize({
      onboarded: true,
      languages: ['te', 'te', 'fr', 'en'],
      ratings: { daya: 'easy', guru: 'good', nope: 'mnemonic' },
      cursor: 99,
      sound: false,
    });
    expect(dirty.languages).toEqual(['te', 'en']);
    expect(dirty.ratings).toEqual({ daya: 'easy' });
    expect(dirty.cursor).toBe(18);
    expect(dirty.sound).toBe(false);
    saveProgress(dirty);
    expect(loadProgress()).toEqual(dirty);
    expect(localStorage.getItem(STORAGE_KEY)).toContain('daya');
  });

  it('formats the local calendar day', () => {
    expect(todayISO(new Date(2026, 9, 27, 23, 30))).toBe('2026-10-27');
  });
});
