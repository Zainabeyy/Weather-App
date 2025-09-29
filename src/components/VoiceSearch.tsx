"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";

type VoiceSearchProps = {
  onResult: (query: string) => void;
};

export default function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = "en-US";
      recog.interimResults = false;
      recog.maxAlternatives = 1;

      recog.onstart = () => setListening(true);
      recog.onend = () => setListening(false);

      recog.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      recog.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (event.error === "aborted") {
          // ignore aborted errors (happen if start() called again too soon)
          console.warn("Speech recognition aborted (not a fatal error).");
          return;
        }
        console.error("Speech recognition error:", event.error);
        setListening(false);
      };

      setRecognition(recog);
    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }
  }, [onResult]);

  const startListening = () => {
    if (!recognition) return;
    if (listening) {
      recognition.stop();
    }
    recognition.start();
  };

  return (
    <button
      type="button"
      onClick={startListening}
      className={`p-2.5 rounded-full shadow-md transition text-neutral-0 ${
        listening
          ? "dark:bg-orange-500/60 animate-pulse text-white"
          : "bg-blue-400 hover:bg-blue-500/50"
      }`}
      aria-label="Start voice search"
    >
      {listening ? <MicOff size={19} /> : <Mic size={19} />}
    </button>
  );
}
