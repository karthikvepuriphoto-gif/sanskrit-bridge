import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, LockIcon, TopBar, cn } from '../components/ui';
import { wordById } from '../data/words';
import { VERSES } from '../data/verses';

export function PathPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main aria-label="Path" className="px-5 pb-10">
      <TopBar
        title={
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-saffron-deep">Suprabhātam</p>
            <h1 className="font-display text-[1.7rem] leading-tight text-indigo">Ślokas 1–5</h1>
          </div>
        }
      />
      <p className="mt-4 text-sm leading-relaxed text-ink/70">
        Śloka 1 is open. It starts the word cards, then one line to say aloud. Ślokas 2–5 stay on the
        map so you can see the road. Their lessons come later.
      </p>

      <ol className="relative mt-6 space-y-3">
        <div className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-gradient-to-b from-saffron via-mist to-mist" aria-hidden />
        {VERSES.map((verse) => {
          const unlocked = verse.number === 1;
          const expanded = open === verse.number;
          return (
            <li key={verse.number} className="relative pl-12">
              <span
                className={cn(
                  'absolute left-0 top-4 grid h-11 w-11 place-items-center rounded-full text-sm font-bold ring-4 ring-ivory',
                  unlocked ? 'bg-saffron text-white' : 'bg-paper text-indigo/50 ring-1 ring-mist',
                )}
              >
                {unlocked ? verse.number : <LockIcon />}
              </span>
              <article className="rounded-[24px] bg-paper p-4 ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-indigo/45">
                      Śloka {verse.number}
                    </p>
                    <h2 className="font-display text-xl leading-tight text-indigo">{verse.title}</h2>
                  </div>
                  <span
                    className={cn(
                      'rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide',
                      unlocked ? 'bg-[#fff1df] text-saffron-deep' : 'bg-mist text-ink/50',
                    )}
                  >
                    {unlocked ? 'Open' : 'Later'}
                  </span>
                </div>
                <p lang="sa" className="mt-3 font-deva text-lg leading-snug text-ink">
                  {verse.lines[0]}
                </p>
                <button
                  type="button"
                  className="mt-2 min-h-10 text-sm font-semibold text-indigo"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : verse.number)}
                >
                  {expanded ? 'Hide the verse' : 'Read the verse'}
                </button>
                {expanded && (
                  <div className="mt-2 border-t border-mist pt-3">
                    <div lang="sa" className="space-y-1 font-deva text-[1.15rem] leading-snug text-indigo">
                      {verse.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                    <div className="mt-2 space-y-0.5 font-iast text-xs leading-relaxed text-indigo/60">
                      {verse.iast.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                    <p className="mixed mt-2 text-sm leading-relaxed text-ink/75">{verse.gloss}</p>
                    <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink/40">
                      {unlocked ? 'Heard in this śloka' : 'Words waiting here'}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {verse.wordIds.map((id) => {
                        const word = wordById(id);
                        if (!word) return null;
                        const chip = (
                          <span className="inline-flex min-h-9 items-center rounded-full bg-ivory px-3 font-deva text-base text-indigo ring-1 ring-indigo/10">
                            {word.devanagari}
                          </span>
                        );
                        return unlocked ? (
                          <Link key={id} to={`/lesson?word=${id}`} aria-label={`Study ${word.iast}`}>
                            {chip}
                          </Link>
                        ) : (
                          <span key={id}>{chip}</span>
                        );
                      })}
                    </div>
                    </div>
                )}
                {unlocked && (
                  <div className="mt-3 grid gap-2">
                    <Link to="/lesson">
                      <Button className="w-full">Study the word cards</Button>
                    </Link>
                    <Link to="/listen">
                      <Button variant="ghost" className="w-full">
                        Say the Śloka 2 line
                      </Button>
                    </Link>
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
