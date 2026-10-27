import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpeech } from '../components/useSpeech';
import { Button, SpeakerIcon, TopBar, cn } from '../components/ui';
import { LISTEN_CHUNK } from '../data/verses';
import { wordById } from '../data/words';
import { useProgress } from '../lib/progress';

export function Listen() {
  const { progress, markListen } = useProgress();
  const { active, speak } = useSpeech();
  const [checked, setChecked] = useState(progress.listenCount > 0);

  function sayIt() {
    markListen();
    setChecked(true);
  }

  return (
    <main aria-label="Listen and repeat" className="px-5 pb-10">
      <TopBar
        title={
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-saffron-deep">Listen & repeat</p>
            <h1 className="font-display text-[1.65rem] leading-tight text-indigo">One line</h1>
          </div>
        }
      />
      <p className="mt-4 text-sm leading-relaxed text-ink/70">
        Hear the opening of Śloka 2, then say it yourself. This version does not use the microphone.
        You decide if it felt right.
      </p>

      <article className="mt-5 rounded-[28px] bg-paper px-5 py-6 text-center ring-1 ring-black/5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-indigo/40">{LISTEN_CHUNK.title}</p>
        <div lang="sa" className="mt-4 space-y-1 font-deva text-[1.85rem] font-bold leading-snug text-ink">
          {LISTEN_CHUNK.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="mt-3 space-y-0.5 font-iast text-sm text-indigo/65">
          {LISTEN_CHUNK.iast.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <p className="mixed mx-auto mt-4 max-w-[18rem] text-sm leading-relaxed text-ink/70">{LISTEN_CHUNK.gloss}</p>

        <div className="relative mx-auto mt-6 grid h-24 w-24 place-items-center">
          {active !== 'off' && <span className="pulse-ring absolute inset-0 rounded-full bg-saffron/40" />}
          <button
            type="button"
            onClick={() => speak(LISTEN_CHUNK.speak, active === 'slow' ? 0.88 : 0.82)}
            className="relative grid h-20 w-20 place-items-center rounded-full bg-saffron text-white shadow-[0_12px_30px_rgba(224,138,58,0.35)]"
            aria-label={active === 'off' ? 'Play the line' : 'Playing'}
          >
            <SpeakerIcon />
          </button>
        </div>
        <div className="mt-3 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => speak(LISTEN_CHUNK.speak, 0.82)}
            className={cn(
              'min-h-11 rounded-full px-4 text-sm font-semibold',
              active === 'normal' ? 'bg-indigo text-white' : 'bg-ivory text-indigo',
            )}
          >
            Hear
          </button>
          <button
            type="button"
            onClick={() => speak(LISTEN_CHUNK.speak, 0.62)}
            className={cn(
              'min-h-11 rounded-full px-4 text-sm font-semibold',
              active === 'slow' ? 'bg-saffron text-white' : 'bg-cream text-indigo',
            )}
          >
            Slow
          </button>
        </div>
      </article>

      <div className="mt-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/40">Lean on these words</p>
        <ul className="mt-2 grid gap-2">
          {LISTEN_CHUNK.wordIds.map((id) => {
            const word = wordById(id);
            if (!word) return null;
            return (
              <li key={id} className="rounded-2xl bg-paper px-3 py-3 ring-1 ring-black/5">
                <div className="flex items-baseline justify-between gap-3">
                  <span lang="sa" className="font-deva text-2xl text-indigo">
                    {word.devanagari}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wide text-saffron-deep">
                    {word.tipType === 'near' ? 'Near cognate' : 'Cognate'}
                  </span>
                </div>
                <p className="font-iast text-sm text-indigo/70">{word.iast}</p>
                <p className="mixed mt-1 text-sm text-ink/75">
                  {word.hindi.text} · {word.english.text}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-5">
        <Button className="w-full" onClick={sayIt}>
          {checked ? 'I said it again' : 'I said it'}
        </Button>
        {checked && (
          <p className="mt-3 text-center text-sm leading-relaxed text-ink/65" role="status">
            Counted {progress.listenCount} time{progress.listenCount === 1 ? '' : 's'} on this device.
            You are the judge.
          </p>
        )}
        <Link to="/path" className="mt-2 block text-center text-sm font-semibold text-indigo">
          Back to the path
        </Link>
      </div>
    </main>
  );
}
