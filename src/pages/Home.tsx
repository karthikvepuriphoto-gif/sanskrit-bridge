import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button, FlameIcon, TopBar } from '../components/ui';
import { WORD_COUNT, WORDS } from '../data/words';
import { useProgress } from '../lib/progress';

export function Home() {
  const { progress } = useProgress();
  const marked = Object.keys(progress.ratings).length;
  const again = WORDS.filter((word) => progress.ratings[word.id] === 'again').length;
  const remaining = Math.max(0, WORD_COUNT - progress.cursor);
  const minutes = Math.max(1, Math.round((remaining || 4) * 25 / 60));
  const next = WORDS[Math.min(progress.cursor, WORD_COUNT - 1)];
  const finishedWords = progress.cursor >= WORD_COUNT;

  let href = '/lesson';
  let kicker = 'Continue';
  let title = next.devanagari;
  let detail = `Word ${Math.min(progress.cursor + 1, WORD_COUNT)} of ${WORD_COUNT}`;
  let action = 'Open the card';

  if (progress.cursor === 0 && marked === 0) {
    kicker = 'Start today’s session';
    detail = `${WORD_COUNT} cognate cards · about ${minutes} min`;
    action = 'Begin with this word';
  } else if (!finishedWords) {
    detail = `Word ${progress.cursor + 1} of ${WORD_COUNT} · about ${minutes} min left`;
    action = 'Continue';
  } else if (again > 0) {
    href = '/lesson?review=again';
    kicker = 'A few still feel new';
    title = 'Again';
    detail = `${again} card${again === 1 ? '' : 's'} marked Again`;
    action = 'Practice those';
  } else {
    href = '/listen';
    kicker = 'Words are in place';
    title = 'उत्तिष्ठोत्तिष्ठ';
    detail = 'Say the opening line of Śloka 2';
    action = 'Listen & repeat';
  }

  return (
    <main aria-label="Home" className="px-5 pb-8">
      <TopBar />
      <p className="mt-6 font-display text-sm text-saffron-deep">Morning session</p>
      <h1 lang="sa" className="mt-1 font-deva text-[2.7rem] font-bold leading-[1.15] text-indigo">
        सुप्रभातम्
      </h1>
      <p className="mt-2 max-w-[20rem] text-[15px] leading-relaxed text-ink/70">
        A short bridge into Śrī Veṅkaṭeśvara Suprabhātam. One hymn. No account.
      </p>

      <section className="mt-5 grid grid-cols-3 gap-2">
        <Stat
          icon={<FlameIcon lit={progress.streak > 0} />}
          value={String(progress.streak)}
          label="Day streak"
          hint={progress.streak === 0 ? 'Starts when you mark a card' : 'Kept on this device'}
        />
        <Stat value={`${marked}`} label="Words" hint={`of ${WORD_COUNT} marked`} />
        <Stat value={String(progress.listenCount)} label="Lines said" hint="Self-check" />
      </section>

      <section className="mt-4 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#e59645] to-[#c4621d] p-5 text-white shadow-[0_16px_40px_rgba(196,98,29,0.28)]">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/80">{kicker}</p>
        <p lang="sa" className="mt-2 font-deva text-[2.4rem] font-bold leading-tight">
          {title}
        </p>
        <p className="mt-1 font-iast text-sm text-white/85">{detail}</p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${Math.min(100, Math.round((progress.cursor / WORD_COUNT) * 100))}%` }}
          />
        </div>
        <Link
          to={href}
          className="mt-4 flex min-h-12 items-center justify-center rounded-2xl bg-white text-[15px] font-bold text-saffron-deep"
        >
          {action}
        </Link>
      </section>

      <section className="mt-4 rounded-[28px] bg-paper p-5 ring-1 ring-black/5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-indigo/45">Your track</p>
        <h2 lang="sa" className="mt-2 font-deva text-[1.7rem] font-bold leading-snug text-indigo">
          श्री वेङ्कटेश्वर सुप्रभातम्
        </h2>
        <p className="font-iast mt-1 text-sm text-indigo/70">Śrī Veṅkaṭeśvara Suprabhātam</p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          Ślokas 1–5 are on the path. Śloka 1 opens {WORD_COUNT} word cards and one line to say aloud.
        </p>
        <div className="mt-4 flex gap-1.5" aria-hidden>
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className={n === 1 ? 'h-1.5 flex-1 rounded-full bg-saffron' : 'h-1.5 flex-1 rounded-full bg-mist'} />
          ))}
        </div>
        <Link to="/path" className="mt-4 block">
          <Button variant="ghost" className="w-full">
            Open the path
          </Button>
        </Link>
      </section>

      {again > 0 && !finishedWords && (
        <Link to="/lesson?review=again" className="mt-3 block rounded-2xl bg-cream px-4 py-3 text-sm font-semibold text-indigo">
          {again} card{again === 1 ? '' : 's'} marked Again
        </Link>
      )}
    </main>
  );
}

function Stat({
  value,
  label,
  hint,
  icon,
}: {
  value: string;
  label: string;
  hint: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-paper px-2.5 py-3 ring-1 ring-black/5">
      <div className="flex items-center gap-1">
        {icon}
        <div className="font-display text-[1.65rem] leading-none text-indigo">{value}</div>
      </div>
      <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/45">{label}</div>
      <div className="mt-0.5 text-[10px] leading-snug text-ink/40">{hint}</div>
    </div>
  );
}
