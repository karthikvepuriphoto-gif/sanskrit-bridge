import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { cn } from './ui';

export function Shell() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <nav
        aria-label="Primary"
        className="grid shrink-0 grid-cols-3 gap-1 border-t border-black/5 bg-paper/95 px-3 pt-2 backdrop-blur-md pb-[max(0.55rem,env(safe-area-inset-bottom))]"
      >
        <Item to="/" label="Home" end icon="home" />
        <Item to="/path" label="Path" icon="path" />
        <Item to="/listen" label="Listen" icon="listen" />
      </nav>
    </div>
  );
}

function Item({
  to,
  label,
  icon,
  end = false,
}: {
  to: string;
  label: string;
  icon: 'home' | 'path' | 'listen';
  end?: boolean;
}) {
  const location = useLocation();
  const active = end ? location.pathname === to : location.pathname.startsWith(to);
  return (
    <NavLink
      to={to}
      end={end}
      className={cn(
        'flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl text-[11px] font-semibold',
        active ? 'bg-cream text-indigo' : 'text-indigo/60',
      )}
      aria-current={active ? 'page' : undefined}
    >
      <Glyph name={icon} />
      {label}
    </NavLink>
  );
}

function Glyph({ name }: { name: 'home' | 'path' | 'listen' }) {
  if (name === 'home') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === 'path') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="7" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="8" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M8.6 7.6c2.4 1 6.2 1.4 7.2 2.6M15.2 13.6c-2 .8-5 2.2-5.6 3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 10h3l5-4v12l-5-4H4v-4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M16 9a4 4 0 0 1 0 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
