import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CognateCard } from '../components/CognateCard';
import { Button } from '../components/ui';
import { WORD_COUNT, WORDS, type Word } from '../data/words';
import { useProgress } from '../lib/progress';
import type { Rating } from '../lib/storage';

function startIndex(review: boolean, word: string | null, cursor: number): number {
  if (review) return 0;
  if (word) {
    const found = WORDS.findIndex((item) => item.id === word);
    if (found >= 0) return found;
  }
  return Math.min(cursor, WORD_COUNT);
}

export function Lesson() {
  const { progress, rate, setSound } = useProgress();
  const [params] = useSearchParams();
  const review = params.get('review') === 'again';
  const wordParam = params.get('word');
  const [index, setIndex] = useState(() => startIndex(review, wordParam, progress.cursor));

  useEffect(() => {
    setIndex(startIndex(review, wordParam, progress.cursor));
  }, [review, wordParam]);

  const queue = useMemo(
    () => (review ? WORDS.filter((word) => progress.ratings[word.id] === 'again') : WORDS),
    [progress.ratings, review],
  );
  const word = queue[index];

  function onRate(current: Word, rating: Rating) {
    const globalIndex = WORDS.findIndex((item) => item.id === current.id);
    rate(current.id, rating, globalIndex);
    if (!review || rating === 'again') setIndex((value) => value + 1);
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <header className="flex items-center justify-between gap-3 px-4 pt-[max(0.85rem,env(safe-area-inset-top))]">
        <Link to="/" className="min-h-11 rounded-full px-3 text-sm font-semibold text-indigo" aria-label="Close lesson">
          Close
        </Link>
        <p className="font-iast text-xs font-semibold uppercase tracking-[0.14em] text-indigo/50">
          {review ? 'Again cards' : 'Suprabhātam'}
        </p>
        <button
          type="button"
          onClick={() => setSound(!progress.sound)}
          className="min-h-11 rounded-full px-3 text-sm font-semibold text-indigo"
          aria-pressed={progress.sound}
        >
          {progress.sound ? 'Voice on' : 'Voice off'}
        </button>
      </header>

      {!word ? (
        <Done review={review} />
      ) : (
        <>
          <div className="px-5 pt-2">
            <div className="mb-1 flex justify-between text-xs font-semibold text-indigo/60">
              <span>{review ? 'Still new' : `Word ${index + 1} of ${WORD_COUNT}`}</span>
              <span>{Math.min(index + 1, queue.length)}/{queue.length}</span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-mist"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={queue.length}
              aria-valuenow={Math.min(index + 1, queue.length)}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-saffron to-indigo"
                style={{ width: `${(Math.min(index + 1, queue.length) / queue.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-3 pt-4">
            <CognateCard
              word={word}
              languages={progress.languages}
              autoPlay={progress.sound}
              legend={!review && index === 0}
            />
          </div>
          <footer className="grid shrink-0 grid-cols-[auto_1fr_1fr_1fr] gap-2 border-t border-black/5 bg-ivory px-4 pt-3 pb-[max(0.8rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              className="min-h-14 rounded-2xl px-3 text-sm font-semibold text-indigo disabled:opacity-30"
              disabled={index === 0}
              onClick={() => setIndex((value) => Math.max(0, value - 1))}
            >
              Back
            </button>
            <RateButton tone="clay" rating="again" onRate={(rating) => onRate(word, rating)} />
            <RateButton tone="indigo" rating="good" onRate={(rating) => onRate(word, rating)} />
            <RateButton tone="sage" rating="easy" onRate={(rating) => onRate(word, rating)} />
          </footer>
        </>
      )}
    </div>
  );
}

function RateButton({
  rating,
  tone,
  onRate,
}: {
  rating: Rating;
  tone: 'clay' | 'indigo' | 'sage';
  onRate: (rating: Rating) => void;
}) {
  const copy = {
    again: ['Again', 'Still new'],
    good: ['Good', 'I know it'],
    easy: ['Easy', 'Familiar'],
  }[rating];
  const styles = {
    clay: 'bg-paper text-clay ring-1 ring-clay/25',
    indigo: 'bg-indigo text-white',
    sage: 'bg-sage text-white',
  }[tone];
  return (
    <button
      type="button"
      onClick={() => onRate(rating)}
      className={`min-h-14 rounded-2xl px-1 text-center active:scale-[0.98] ${styles}`}
    >
      <span className="block text-[15px] font-bold">{copy[0]}</span>
      <span className="block text-[10px] font-medium opacity-75">{copy[1]}</span>
    </button>
  );
}

function Done({ review }: { review: boolean }) {
  const { progress } = useProgress();
  const counts = { again: 0, good: 0, easy: 0 };
  for (const rating of Object.values(progress.ratings)) counts[rating] += 1;
  return (
    <main className="flex flex-1 flex-col px-5 pb-8 pt-6">
      <p className="font-display text-sm text-saffron-deep">{review ? 'Review clear' : 'Opening set'}</p>
      <h1 className="mt-1 font-display text-[2.1rem] leading-tight text-indigo">
        {review ? 'Those cards feel steadier.' : 'Eighteen words, one morning.'}
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
        {review
          ? 'Nothing is still marked Again. The line is ready when you are.'
          : 'You marked every opening card. Next, say one line out loud. You are the judge — no microphone.'}
      </p>
      <div className="mt-5 grid grid-cols-3 gap-2">
        <Count label="Again" value={counts.again} />
        <Count label="Good" value={counts.good} />
        <Count label="Easy" value={counts.easy} />
      </div>
      <div className="mt-auto grid gap-2 pt-8">
        <Link to="/listen">
          <Button className="w-full">Say the morning line</Button>
        </Link>
        <Link to="/lesson?word=suprabhatam">
          <Button variant="ghost" className="w-full">
            Look through the cards
          </Button>
        </Link>
        <Link to="/" className="min-h-11 text-center text-sm font-semibold text-indigo">
          Back home
        </Link>
      </div>
    </main>
  );
}

function Count({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-paper px-2 py-3 text-center ring-1 ring-black/5">
      <div className="font-display text-2xl text-indigo">{value}</div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-ink/45">{label}</div>
    </div>
  );
}
