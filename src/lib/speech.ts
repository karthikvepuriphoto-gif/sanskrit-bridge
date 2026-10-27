export function stopSpeech(): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

function pickVoice(synth: SpeechSynthesis): { voice: SpeechSynthesisVoice | null; lang: string } {
  const voices = synth.getVoices();
  const sa = voices.find((voice) => voice.lang.toLowerCase().startsWith('sa'));
  const hi = voices.find((voice) => voice.lang.toLowerCase().startsWith('hi'));
  if (sa) return { voice: sa, lang: sa.lang || 'sa-IN' };
  if (hi) return { voice: hi, lang: hi.lang || 'hi-IN' };
  return { voice: null, lang: 'hi-IN' };
}

/** Prototype pronunciation. Prefers a Sanskrit voice, then Hindi. */
export function speakSanskrit(
  text: string,
  rate: number,
  hooks?: { onend?: () => void },
): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    hooks?.onend?.();
    return;
  }
  const synth = window.speechSynthesis;
  const speakNow = () => {
    const { voice, lang } = pickVoice(synth);
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voice;
    utter.lang = lang;
    utter.rate = rate;
    utter.onend = () => hooks?.onend?.();
    utter.onerror = () => hooks?.onend?.();
    synth.cancel();
    synth.speak(utter);
    synth.resume();
  };

  if (synth.getVoices().length === 0) {
    let started = false;
    const once = () => {
      if (started) return;
      started = true;
      speakNow();
    };
    synth.addEventListener('voiceschanged', once, { once: true });
    window.setTimeout(once, 350);
    return;
  }
  speakNow();
}
