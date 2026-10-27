import { useCallback, useEffect, useRef, useState } from 'react';
import { speakSanskrit, stopSpeech } from '../lib/speech';

export function useSpeech() {
  const [active, setActive] = useState<'off' | 'normal' | 'slow'>('off');
  const token = useRef(0);

  const stop = useCallback(() => {
    token.current += 1;
    stopSpeech();
    setActive('off');
  }, []);

  const speak = useCallback((text: string, rate: number) => {
    const id = ++token.current;
    setActive(rate < 0.75 ? 'slow' : 'normal');
    speakSanskrit(text, rate, {
      onend: () => {
        if (token.current === id) setActive('off');
      },
    });
  }, []);

  useEffect(() => stop, [stop]);

  return { active, speak, stop };
}
