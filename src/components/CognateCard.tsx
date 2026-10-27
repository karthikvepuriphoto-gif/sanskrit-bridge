import { useEffect } from 'react';
import { TIP_LABEL, type Word } from '../data/words';
import { LANG_META, orderLangs } from '../lib/langs';
import type { Lang } from '../lib/storage';
import { useSpeech } from './useSpeech';
import { cn, SpeakerIcon } from './ui';

export function CognateCard({
  word,
  languages,
  autoPlay = false,
  legend = false,
}: {
  word: Word;
  languages: Lang[];
  autoPlay?: boolean;
  legend?: boolean;
}) {
  const { active, speak, stop } = useSpeech();
  const order = orderLangs(languages);
  const stressed = word.syllables.find((syllable) => syllable.stress);

  useEffect(() => {
    if (!autoPlay) return;
    speak(word.devanagari, 0.88);
    return () => stop();
  }, [autoPlay, speak, stop, word.devanagari, word.id]);

  return (
    <article className="rise overflow-hidden rounded-[28px] bg-paper shadow-[0_18px_50px_rgba(36,49,92,0.10)] ring-1 ring-indigo/10">
      <div className="h-1.5 bg-gradient-to-r from-saffron via-[#f6e0b8] to-indigo" />
      <div className="px-5 pb-5 pt-4">
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em]',
              word.tipType === 'cognate' && 'bg-indigo text-white',
              word.tipType === 'near' && 'bg-[#f6e2c8] text-[#8a4b12]',
              word.tipType === 'mnemonic' && 'bg-white text-clay ring-1 ring-clay/30',
            )}
          >
            {TIP_LABEL[word.tipType]}
          </span>
          <span className="font-iast text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo/50">
            {word.verseRef}
          </span>
        </div>

        <h2
          lang="sa"
          className="mt-4 px-1 text-center font-deva text-[3.15rem] font-bold leading-[1.2] text-ink"
        >
          {word.devanagari}
        </h2>
        <p className="mt-1 text-center font-iast text-sm text-indigo/70">{word.iast}</p>

        <div className="mt-4">
          <Syllables syllables={word.syllables} />
          <p className="mt-2 text-center font-iast text-xs text-indigo/60">
            {stressed ? (
              <>
                Stress <span className="font-bold text-saffron-deep">{stressed.text}</span>
              </>
            ) : (
              'Even rhythm — no single heavy stress'
            )}
          </p>
          {word.also && (
            <div className="mt-3">
              <p className="mb-1.5 text-center font-iast text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                {word.also.label}
              </p>
              <Syllables syllables={word.also.syllables} />
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => speak(word.devanagari, 0.88)}
            className={cn(
              'inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold',
              active === 'normal' ? 'bg-indigo text-white' : 'bg-indigo text-white',
            )}
            aria-pressed={active === 'normal'}
          >
            <SpeakerIcon />
            {active === 'normal' ? 'Playing' : 'Hear'}
          </button>
          <button
            type="button"
            onClick={() => speak(word.devanagari, 0.62)}
            className={cn(
              'inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold ring-1',
              active === 'slow'
                ? 'bg-saffron text-white ring-saffron'
                : 'bg-cream text-indigo ring-saffron/30',
            )}
            aria-pressed={active === 'slow'}
          >
            {active === 'slow' ? 'Playing slow' : 'Slow'}
          </button>
        </div>
        <p className="mx-auto mt-2 max-w-[18rem] text-center text-[11px] leading-relaxed text-ink/45">
          Device voice — Sanskrit if the phone has it, otherwise Hindi. Recorded audio comes later.
        </p>

        <ul className="mt-4 space-y-2">
          {order.map((lang) => (
            <LangRow key={lang} lang={lang} word={word} yours={languages.includes(lang)} />
          ))}
        </ul>

        <div className="mt-4 rounded-2xl bg-cream px-3.5 py-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-saffron-deep">Bridge tip</p>
          <p className="mixed mt-1.5 text-[15px] leading-relaxed text-ink/90">{word.tip}</p>
        </div>

        {legend && (
          <p className="mixed mt-3 text-[12.5px] leading-relaxed text-ink/55">
            Cognate means a real shared word. Near cognate means the same family, with the sound changed.
            Mnemonic means only a memory hook — never history. This opening set does not use a mnemonic.
          </p>
        )}

        <div className="mt-4 border-t border-mist pt-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-indigo/45">In the hymn</p>
          <p lang="sa" className="mt-1 font-deva text-[1.35rem] leading-snug text-indigo">
            {word.heard}
          </p>
          <p className="font-iast text-xs text-indigo/60">{word.heardIast}</p>
          <p className="mixed mt-1.5 text-sm leading-relaxed text-ink/75">{word.gloss}</p>
        </div>
      </div>
    </article>
  );
}

function Syllables({ syllables }: { syllables: Word['syllables'] }) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5" aria-label="Syllables">
      {syllables.map((syllable, index) => (
        <span
          key={`${syllable.text}-${index}`}
          className={cn(
            'font-iast min-h-9 rounded-full px-3 py-1.5 text-base',
            syllable.stress
              ? 'bg-saffron font-bold text-white shadow-sm'
              : 'bg-ivory text-indigo ring-1 ring-indigo/10',
          )}
        >
          {syllable.text}
        </span>
      ))}
    </div>
  );
}

function LangRow({ lang, word, yours }: { lang: Lang; word: Word; yours: boolean }) {
  const meta = LANG_META[lang];
  const line = lang === 'hi' ? word.hindi : lang === 'te' ? word.telugu : word.english;
  const script =
    lang === 'hi' ? 'font-deva text-xl' : lang === 'te' ? 'font-telugu text-xl' : 'font-iast text-[17px]';
  return (
    <li
      className={cn(
        'rounded-2xl px-3 py-2.5',
        yours ? 'bg-[#fff6ea] ring-1 ring-saffron/35' : 'bg-ivory/70 ring-1 ring-black/5',
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-indigo/50">
          {meta.label}
        </span>
        {yours && (
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-saffron-deep">
            Your bridge
          </span>
        )}
      </div>
      <p lang={meta.lang} className={cn('mt-0.5 leading-snug text-ink', script)}>
        {line.text}
      </p>
      {line.note && <p className="mixed mt-1 text-xs leading-relaxed text-ink/55">{line.note}</p>}
    </li>
  );
}
