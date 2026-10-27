# Śabda Bridge (शब्द ब्रिज)

A mobile-first Sanskrit study PWA for Karthik Vepuri. Phase 1 teaches the opening words of **Śrī Veṅkaṭeśvara Suprabhātam** by bridging each word to Hindi, Telugu, and English.

There is no account. Progress stays in this browser (`localStorage`, mirrored into IndexedDB for a later scheduler).

## This version

- Onboarding: languages you know (English, Hindi, Telugu) and a demo card for सुप्रभातम्
- Home: continue, a real day streak, and the Suprabhātam track only
- 18 cognate cards from the plan’s Suprabhātam seed list, with syllable stress, a bridge tip, and Again / Good / Easy
- Path for Ślokas 1–5. Śloka 1 opens the cards. Ślokas 2–5 can be read; their lessons are later
- Listen & repeat for the opening line of Śloka 2. You check yourself — no microphone
- Installable shell via `vite-plugin-pwa`, base path `/sanskrit-bridge/`

**Cognate** means a real shared word. **Near cognate** means the same family with the sound changed. **Mnemonic** is reserved for a memory hook and is not used in this set. Familiar translations that are not relatives (Telugu లేవు, Telugu అమ్మ) are labeled as such.

Pronunciation uses the device voice (`sa-IN`, then `hi-IN`). Recorded audio is not in this phase.

The hymn text follows the Tirumala recitation of Prativādi Bhayaṅkara Aṇṇaṇ. Glosses are short study aids.

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173/sanskrit-bridge/
npm test
npm run build
npm run preview  # http://127.0.0.1:4173/sanskrit-bridge/
```

## GitHub Pages

`.github/workflows/pages.yml` builds `dist` and deploys with GitHub Actions. In the repo settings, set Pages source to **GitHub Actions**. The site is served at `/sanskrit-bridge/`. `404.html` is a copy of the app so client-side routes survive a refresh.
