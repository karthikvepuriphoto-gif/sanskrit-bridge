import { useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Shell } from './components/Shell';
import { Frame } from './components/ui';
import { ProgressProvider, useProgress } from './lib/progress';
import { Home } from './pages/Home';
import { Lesson } from './pages/Lesson';
import { Listen } from './pages/Listen';
import { Onboarding } from './pages/Onboarding';
import { PathPage } from './pages/PathPage';
import { Settings } from './pages/Settings';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter basename={basename}>
        <InstallBridge />
        <Frame>
          <Routes>
            <Route path="/welcome" element={<WelcomeGate />} />
            <Route element={<RequireOnboarding />}>
              <Route element={<Shell />}>
                <Route index element={<Home />} />
                <Route path="path" element={<PathPage />} />
                <Route path="listen" element={<Listen />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="lesson" element={<Lesson />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Frame>
      </BrowserRouter>
    </ProgressProvider>
  );
}

function WelcomeGate() {
  const { progress } = useProgress();
  if (progress.onboarded) return <Navigate to="/" replace />;
  return <Onboarding />;
}

function RequireOnboarding() {
  const { progress } = useProgress();
  if (!progress.onboarded) return <Navigate to="/welcome" replace />;
  return <Outlet />;
}

function InstallBridge() {
  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault();
      const deferred = event as Event & { prompt: () => Promise<void> };
      (window as Window & { __shabdaInstall?: () => Promise<void> }).__shabdaInstall = () =>
        deferred.prompt();
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);
  return null;
}
