import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  applyListen,
  applyRating,
  clearMirroredProgress,
  defaultProgress,
  loadProgress,
  readMirroredProgress,
  saveProgress,
  STORAGE_KEY,
  todayISO,
  type Lang,
  type Progress,
  type Rating,
} from './storage';

interface ProgressApi {
  progress: Progress;
  completeOnboarding: (languages: Lang[]) => void;
  setLanguages: (languages: Lang[]) => void;
  rate: (wordId: string, rating: Rating, index: number) => void;
  markListen: () => void;
  setSound: (sound: boolean) => void;
  reset: () => void;
}

const ProgressContext = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());

  const commit = useCallback((next: Progress) => {
    saveProgress(next);
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    let cancelled = false;
    void readMirroredProgress().then((remote) => {
      if (cancelled || !remote) return;
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        return;
      }
      saveProgress(remote);
      setProgress(loadProgress());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const api = useMemo<ProgressApi>(
    () => ({
      progress,
      completeOnboarding(languages) {
        commit({ ...progress, onboarded: true, languages });
      },
      setLanguages(languages) {
        commit({ ...progress, languages });
      },
      rate(wordId, rating, index) {
        commit(applyRating(progress, wordId, rating, index, todayISO()));
      },
      markListen() {
        commit(applyListen(progress, todayISO()));
      },
      setSound(sound) {
        commit({ ...progress, sound });
      },
      reset() {
        saveProgress(defaultProgress());
        void clearMirroredProgress();
        setProgress(defaultProgress());
      },
    }),
    [commit, progress],
  );

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressApi {
  const value = useContext(ProgressContext);
  if (!value) throw new Error('useProgress must be used inside ProgressProvider');
  return value;
}
