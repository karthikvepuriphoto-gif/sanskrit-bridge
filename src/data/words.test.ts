import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { TIP_LABEL, WORDS } from './words';
import { LISTEN_CHUNK, VERSES } from './verses';

describe('Suprabhātam opening words', () => {
  it('ships 12 to 18 seed cards and no Cālīsā headwords', () => {
    expect(WORDS.length).toBeGreaterThanOrEqual(12);
    expect(WORDS.length).toBeLessThanOrEqual(18);
    const heads = WORDS.map((word) => word.devanagari);
    expect(heads).not.toContain('गुरु');
    expect(heads).not.toContain('बुद्धि');
    expect(heads).not.toContain('चालीसा');
  });

  it('labels real bridges, and keeps mnemonic as its own label', () => {
    expect(TIP_LABEL.mnemonic).toBe('Mnemonic');
    expect(TIP_LABEL.cognate).toBe('Cognate');
    expect(TIP_LABEL.near).toBe('Near cognate');
    for (const word of WORDS) {
      expect(word.tipType === 'cognate' || word.tipType === 'near').toBe(true);
      expect(word.tip.length).toBeGreaterThan(20);
      expect(word.devanagari).not.toMatch(/[A-Za-z]/);
      expect(word.hindi.text.length).toBeGreaterThan(0);
      expect(word.telugu.text.length).toBeGreaterThan(0);
      expect(word.english.text.length).toBeGreaterThan(0);
      expect(word.syllables.length).toBeGreaterThan(1);
      expect(word.heard.length).toBeGreaterThan(0);
      expect(word.gloss.length).toBeGreaterThan(0);
    }
    const ids = new Set(WORDS.map((word) => word.id));
    expect(ids.size).toBe(WORDS.length);
  });

  it('does not pretend translations are cognates', () => {
    const uttistha = WORDS.find((word) => word.id === 'uttistha');
    expect(uttistha?.tipType).toBe('near');
    expect(uttistha?.tip).toMatch(/not a cognate/);
    expect(uttistha?.telugu.note).toMatch(/not a cognate/);
    const mata = WORDS.find((word) => word.id === 'mata');
    expect(mata?.tip).toMatch(/not a Sanskrit cognate/);
    expect(mata?.english.note).toMatch(/not a borrowing/);
    const sarana = WORDS.find((word) => word.id === 'sarana');
    expect(sarana?.devanagari.endsWith('ण')).toBe(true);
    expect(sarana?.iast).toContain('\u1e47');
    expect(WORDS.find((word) => word.id === 'mangalam')?.iast).toContain('\u1e45');
  });

  it('points path chips and the listen line at real cards', () => {
    const ids = new Set(WORDS.map((word) => word.id));
    expect(VERSES).toHaveLength(5);
    expect(VERSES[0]?.number).toBe(1);
    for (const verse of VERSES) {
      for (const id of verse.wordIds) expect(ids.has(id)).toBe(true);
    }
    for (const id of LISTEN_CHUNK.wordIds) expect(ids.has(id)).toBe(true);
    expect(LISTEN_CHUNK.lines[0]).toContain('गोविन्द');
  });
});

describe('deploy contract', () => {
  it('uses the /sanskrit-bridge/ base and a Pages workflow', () => {
    const vite = readFileSync(new URL('../../vite.config.ts', import.meta.url), 'utf8');
    const workflow = readFileSync(new URL('../../.github/workflows/pages.yml', import.meta.url), 'utf8');
    expect(vite).toContain("base: '/sanskrit-bridge/'");
    expect(workflow).toContain('actions/deploy-pages@v4');
    expect(workflow).toContain('upload-pages-artifact');
  });
});
