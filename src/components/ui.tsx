import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(ellipse_at_top,_#3c4d84_0%,_#1a2144_42%,_#12182f_100%)] text-ink">
      <div className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col bg-ivory shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_80px_rgba(0,0,0,0.35)]">
        {children}
      </div>
    </div>
  );
}

export function Wordmark() {
  return (
    <div>
      <div lang="sa" className="font-deva text-[1.45rem] leading-none text-indigo">
        शब्द ब्रिज
      </div>
      <div className="mt-1 font-iast text-[11px] font-bold uppercase tracking-[0.18em] text-saffron-deep">
        Śabda Bridge
      </div>
    </div>
  );
}

export function IconButton({
  label,
  to,
  children,
}: {
  label: string;
  to?: string;
  children: ReactNode;
}) {
  const className =
    'grid h-11 w-11 place-items-center rounded-full bg-paper text-indigo ring-1 ring-black/5';
  if (to) {
    return (
      <Link to={to} aria-label={label} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <span className={className} aria-hidden>
      {children}
    </span>
  );
}

export function TopBar({
  title,
  action,
}: {
  title?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className="flex items-center justify-between gap-3 px-5 pt-[max(1.05rem,env(safe-area-inset-top))]">
      <div className="min-w-0">{title ?? <Wordmark />}</div>
      {action ?? (
        <IconButton label="Settings" to="/settings">
          <GearIcon />
        </IconButton>
      )}
    </header>
  );
}

export function GearIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M19.4 13.1a7.7 7.7 0 0 0 .05-2.2l1.7-1.3-1.6-2.8-2 .6a7.8 7.8 0 0 0-1.9-1.1L15.2 4h-3.2l-.4 2.3c-.7.2-1.3.6-1.9 1.1l-2-.6-1.6 2.8 1.7 1.3a7.7 7.7 0 0 0 0 2.2l-1.7 1.3 1.6 2.8 2-.6c.6.5 1.2.9 1.9 1.1l.4 2.3h3.2l.4-2.3c.7-.2 1.3-.6 1.9-1.1l2 .6 1.6-2.8-1.7-1.3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FlameIcon({ lit }: { lit: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 3s2 3 2 5.2c0 1.2-.7 1.8-1.4 1.4.8-2.2-.2-3.4-.2-3.4S8 9.2 8 13.2C8 16.6 10 19 12.6 19c2.8 0 4.4-2.2 4.4-4.8 0-3.6-3-5.6-5-11.2Z"
        fill={lit ? '#e08a3a' : '#e6dfd2'}
      />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function SpeakerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 10h3l5-4v12l-5-4H4v-4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M16 9.5a3.5 3.5 0 0 1 0 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'saffron' | 'indigo' | 'sage' | 'clay' | 'ghost';
};

export function Button({ variant = 'saffron', className, type = 'button', ...props }: ButtonProps) {
  const styles: Record<NonNullable<ButtonProps['variant']>, string> = {
    saffron: 'bg-saffron text-white shadow-[0_10px_24px_rgba(224,138,58,0.28)] hover:bg-saffron-deep',
    indigo: 'bg-indigo text-white hover:bg-indigo-soft',
    sage: 'bg-sage text-white',
    clay: 'bg-paper text-clay ring-1 ring-clay/25',
    ghost: 'bg-paper text-indigo ring-1 ring-black/10',
  };
  return (
    <button
      type={type}
      className={cn(
        'inline-flex min-h-12 items-center justify-center rounded-2xl px-4 text-center text-[15px] font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40',
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
