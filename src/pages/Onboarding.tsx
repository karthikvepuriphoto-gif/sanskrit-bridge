import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognateCard } from '../components/CognateCard';
import { Button, cn, Wordmark } from '../components/ui';
import { WORDS } from '../data/words';
import { LANG_META } from '../lib/langs';
import { useProgress } from '../lib/progress';
import type { Lang } from '../lib/storage';

const DEMO = WORDS[0];

export function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useProgress();
  const [step, setStep] = useState<1 | 2>(1);
  const [languages, setLanguages] = useState<Lang[]>([]);

  function toggle(lang: Lang) {
    setLanguages((current) =>
      current.includes(lang) ? current.filter((item) => item !== lang) : [...current, lang],
    );
  }

  function begin() {
    completeOnboarding(languages);
    navigate('/');
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <header className="px-5 pt-[max(1.15rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <Wordmark />
          <p className="font-iast text-xs font-semibold text-indigo/50">
            {step} / 2
          </p>
        </div>
      </header>

      {step === 1 ? (
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-6">
          <div className="rise mx-auto mt-8 grid h-28 w-28 place-items-center rounded-full bg-gradient-to-b from-[#f8e3c6] to-[#f0c98a] shadow-[inset_0_-8px_16px_rgba(184,95,22,0.12)]">
            <span lang="sa" className="font-deva text-5xl font-bold text-indigo">
              सु
            </span>
          </div>
          <h1 className="mt-6 text-center font-display text-[2rem] leading-tight text-indigo">
            Words you already almost know.
          </h1>
          <p className="mx-auto mt-3 max-w-[20rem] text-center text-[15px] leading-relaxed text-ink/70">
            Sanskrit from the morning Suprabhātam, bridged to the languages you speak. Five to ten
            minutes. No account. Saved on this device.
          </p>
          <p className="mt-8 text-sm font-semibold text-indigo">I know</p>
          <div className="mt-3 grid gap-2.5">
            {(['en', 'hi', 'te'] as Lang[]).map((lang) => {
              const meta = LANG_META[lang];
              const on = languages.includes(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(lang)}
                  className={cn(
                    'flex min-h-[4.25rem] items-center justify-between rounded-[22px] px-4 text-left transition active:scale-[0.99]',
                    on ? 'bg-indigo text-white shadow-[0_12px_28px_rgba(36,49,92,0.18)]' : 'bg-paper ring-1 ring-black/10',
                  )}
                >
                  <span>
                    <span
                      lang={meta.lang}
                      className={cn(
                        'block text-xl leading-tight',
                        lang === 'hi' && 'font-deva',
                        lang === 'te' && 'font-telugu',
                      )}
                    >
                      {meta.native}
                    </span>
                    <span className={cn('text-sm', on ? 'text-white/75' : 'text-ink/50')}>{meta.label}</span>
                  </span>
                  <span
                    className={cn(
                      'grid h-7 w-7 place-items-center rounded-full text-sm font-bold',
                      on ? 'bg-saffron text-white' : 'bg-mist text-transparent',
                    )}
                    aria-hidden
                  >
                    ✓
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink/50">
            Every card still shows Hindi, Telugu, and English. Yours are highlighted first.
          </p>
          <div className="mt-auto pt-6">
            <Button className="w-full" disabled={languages.length === 0} onClick={() => setStep(2)}>
              Show me a cognate
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4 pt-4">
            <p className="rise font-display text-2xl leading-snug text-indigo">You already say this.</p>
            <p className="mb-4 mt-1 text-sm leading-relaxed text-ink/65">
              सुप्रभातम् is the hymn’s good morning. Here is the card you will study.
            </p>
            <CognateCard word={DEMO} languages={languages} legend />
          </div>
          <div className="shrink-0 space-y-2 border-t border-black/5 bg-ivory px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button className="w-full" onClick={begin}>
              Begin Suprabhātam
            </Button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="min-h-11 w-full text-sm font-semibold text-indigo/70"
            >
              Change languages
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
