import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TopBar, cn } from '../components/ui';
import { LANG_META } from '../lib/langs';
import { useProgress } from '../lib/progress';
import type { Lang } from '../lib/storage';

export function Settings() {
  const { progress, setLanguages, setSound, reset } = useProgress();
  const [confirm, setConfirm] = useState(false);
  const [installHint, setInstallHint] = useState('');

  function toggle(lang: Lang) {
    const has = progress.languages.includes(lang);
    if (has && progress.languages.length === 1) return;
    const next = has ? progress.languages.filter((item) => item !== lang) : [...progress.languages, lang];
    setLanguages(next);
  }

  async function install() {
    const prompt = (window as Window & { __shabdaInstall?: () => Promise<void> }).__shabdaInstall;
    if (!prompt) {
      setInstallHint('In the browser menu, choose Add to Home Screen. After the first visit, the shell works offline.');
      return;
    }
    await prompt();
  }

  const standalone =
    typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches;

  return (
    <main aria-label="Settings" className="px-5 pb-10">
      <TopBar
        title={<h1 className="font-display text-[1.7rem] text-indigo">Settings</h1>}
        action={
          <Link to="/" className="min-h-11 rounded-full px-3 text-sm font-semibold text-indigo">
            Done
          </Link>
        }
      />

      <section className="mt-5 rounded-[24px] bg-paper p-4 ring-1 ring-black/5">
        <h2 className="text-sm font-bold text-indigo">Languages I know</h2>
        <p className="mt-1 text-xs leading-relaxed text-ink/55">
          Highlighted first on every card. Hindi, Telugu, and English always stay visible.
        </p>
        <div className="mt-3 grid gap-2">
          {(['en', 'hi', 'te'] as Lang[]).map((lang) => {
            const on = progress.languages.includes(lang);
            const meta = LANG_META[lang];
            return (
              <button
                key={lang}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(lang)}
                className={cn(
                  'flex min-h-12 items-center justify-between rounded-2xl px-3 text-left',
                  on ? 'bg-indigo text-white' : 'bg-ivory text-ink',
                )}
              >
                <span className={cn(lang === 'hi' && 'font-deva text-lg', lang === 'te' && 'font-telugu text-lg')}>
                  {meta.native}
                </span>
                <span className="text-xs font-semibold">{on ? 'On' : 'Off'}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-3 rounded-[24px] bg-paper p-4 ring-1 ring-black/5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-indigo">Voice on new cards</h2>
            <p className="mt-1 text-xs leading-relaxed text-ink/55">
              Uses the phone’s Sanskrit voice, or Hindi if Sanskrit is missing.
            </p>
          </div>
          <button
            type="button"
            aria-pressed={progress.sound}
            onClick={() => setSound(!progress.sound)}
            className={cn(
              'min-h-11 shrink-0 rounded-full px-4 text-sm font-bold',
              progress.sound ? 'bg-saffron text-white' : 'bg-mist text-ink',
            )}
          >
            {progress.sound ? 'On' : 'Off'}
          </button>
        </div>
      </section>

      <section className="mt-3 rounded-[24px] bg-paper p-4 ring-1 ring-black/5">
        <h2 className="text-sm font-bold text-indigo">Install</h2>
        <p className="mt-1 text-xs leading-relaxed text-ink/55">
          {standalone
            ? 'This already looks like an installed app.'
            : 'Add Śabda Bridge to your home screen. Progress stays in this browser.'}
        </p>
        {!standalone && (
          <Button variant="ghost" className="mt-3 w-full" onClick={() => void install()}>
            Add to Home Screen
          </Button>
        )}
        {installHint && <p className="mt-2 text-xs leading-relaxed text-ink/60">{installHint}</p>}
      </section>

      <section className="mt-3 rounded-[24px] bg-cream p-4">
        <h2 className="text-sm font-bold text-indigo">About the words</h2>
        <p className="mixed mt-2 text-sm leading-relaxed text-ink/75">
          Suprabhātam here is the hymn of Prativādi Bhayaṅkara Aṇṇaṇ, in the Tirumala tradition.
          Glosses are short study aids. A cognate is a real shared word. A near cognate is the same
          family with the sound changed. A mnemonic would be only a memory hook — this version does
          not use one, and it will never be labeled as history.
        </p>
      </section>

      <section className="mt-3 rounded-[24px] bg-paper p-4 ring-1 ring-black/5">
        <h2 className="text-sm font-bold text-indigo">Progress on this device</h2>
        <p className="mt-1 text-xs leading-relaxed text-ink/55">
          Streak {progress.streak} · {progress.xp} quiet points · {progress.listenCount} lines said.
          Nothing is sent to an account.
        </p>
        {!confirm ? (
          <button
            type="button"
            onClick={() => setConfirm(true)}
            className="mt-3 min-h-11 text-sm font-semibold text-clay"
          >
            Reset progress
          </button>
        ) : (
          <div className="mt-3 grid gap-2">
            <p className="text-sm text-ink/70">Erase the streak, cards, and language choices on this device?</p>
            <Button
              variant="clay"
              onClick={() => {
                reset();
                window.location.assign(`${import.meta.env.BASE_URL}welcome`);
              }}
            >
              Yes, erase
            </Button>
            <Button variant="ghost" onClick={() => setConfirm(false)}>
              Keep my progress
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
