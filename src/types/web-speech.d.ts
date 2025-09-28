declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }

  interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    start: () => void;
    stop: () => void;
    abort: () => void;
    onaudioend: (() => void) | null;
    onaudiostart: (() => void) | null;
    onend: (() => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onnomatch: (() => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onsoundend: (() => void) | null;
    onsoundstart: (() => void) | null;
    onspeechend: (() => void) | null;
    onspeechstart: (() => void) | null;
    onstart: (() => void) | null;
  }

  interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
    readonly message: string;
  }
}

export {};
