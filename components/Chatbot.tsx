"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuMessageCircle, LuMic, LuMicOff, LuSendHorizontal, LuSparkles, LuX } from "react-icons/lu";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_INPUT_LENGTH = 600;
const AUTO_SEND_SILENCE_MS = 3000;

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0: { transcript: string };
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

// Speech recognition frequently mishears "Atharv" as similar-sounding
// words/phrases (e.g. "Arthur", "at Harv", "a thar"). Fix those up before the
// transcript is stored, since the Web Speech API has no custom-vocabulary hint.
const NAME_TARGET = "atharv";
const NAME_PHRASE_FIXES: Array<[RegExp, string]> = [
  [/\bat\s*harv\b/gi, "Atharv"],
  [/\ba\s*thar[v]?\b/gi, "Atharv"],
  [/\bar+thu?r\b/gi, "Atharv"],
  [/\bauthor\b/gi, "Atharv"],
];

function levenshteinDistance(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dist = Array.from({ length: rows }, (_, i) => [i, ...Array(cols - 1).fill(0)]);
  for (let j = 1; j < cols; j++) dist[0][j] = j;

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dist[i][j] = Math.min(
        dist[i - 1][j] + 1,
        dist[i][j - 1] + 1,
        dist[i - 1][j - 1] + cost,
      );
    }
  }
  return dist[rows - 1][cols - 1];
}

function correctNamePronunciation(text: string): string {
  let corrected = text;
  for (const [pattern, replacement] of NAME_PHRASE_FIXES) {
    corrected = corrected.replace(pattern, replacement);
  }

  return corrected.replace(/\b[a-zA-Z']{4,9}\b/g, (word) => {
    const lower = word.toLowerCase();
    if (lower === NAME_TARGET) return "Atharv";
    return levenshteinDistance(lower, NAME_TARGET) <= 2 ? "Atharv" : word;
  });
}

function TypingIndicator() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-xl bg-black/5 px-3 py-2.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-black/40"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const baseTextRef = useRef("");
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sendMessageRef = useRef<() => void>(() => {});

  function clearSilenceTimer() {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }

  function scheduleAutoSend() {
    clearSilenceTimer();
    silenceTimerRef.current = setTimeout(() => {
      silenceTimerRef.current = null;
      recognitionRef.current?.stop();
      sendMessageRef.current();
    }, AUTO_SEND_SILENCE_MS);
  }

  useEffect(() => {
    const SpeechRecognitionCtor =
      typeof window !== "undefined"
        ? (window as unknown as {
            SpeechRecognition?: new () => SpeechRecognitionLike;
            webkitSpeechRecognition?: new () => SpeechRecognitionLike;
          }).SpeechRecognition ??
          (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike })
            .webkitSpeechRecognition
        : undefined;

    if (!SpeechRecognitionCtor) return;

    setSpeechSupported(true);
    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      const correctedFinal = final ? correctNamePronunciation(final) : final;
      const combined = `${baseTextRef.current}${correctedFinal}${interim}`.slice(0, MAX_INPUT_LENGTH);
      setInput(combined);
      if (correctedFinal) {
        baseTextRef.current = `${baseTextRef.current}${correctedFinal}`;
      }
      if (combined.trim()) {
        scheduleAutoSend();
      } else {
        clearSilenceTimer();
      }
    };

    recognition.onerror = () => {
      clearSilenceTimer();
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      clearSilenceTimer();
      recognition.stop();
    };
  }, []);

  function toggleListening() {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isListening) {
      clearSilenceTimer();
      recognition.stop();
      setIsListening(false);
      return;
    }

    baseTextRef.current = input ? `${input} ` : "";
    setError(null);
    try {
      recognition.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, isStreaming]);

  useEffect(() => {
    const textarea = inputRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, [input]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(id);
    }
  }, [open]);

  function toggleOpen() {
    setOpen((prev) => {
      const next = !prev;
      if (!next) {
        // Closing the widget starts a fresh conversation next time it's opened.
        setMessages([]);
        setInput("");
        setError(null);
        setIsStreaming(false);
      }
      return next;
    });
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    clearSilenceTimer();

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    setError(null);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    baseTextRef.current = "";
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantText };
          return updated;
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsStreaming(false);
    }
  }

  useEffect(() => {
    sendMessageRef.current = () => void sendMessage();
  });

  const lastMessage = messages[messages.length - 1];
  const isWaitingForFirstToken =
    isStreaming && (!lastMessage || lastMessage.role !== "assistant" || lastMessage.content === "");

  return (
    <>
      <motion.button
        type="button"
        onClick={toggleOpen}
        aria-label={open ? "Close chat" : "Ask about Atharv"}
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg shadow-black/25"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        {!open ? (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-black/30"
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}

        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              <LuX className="h-5 w-5" aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              <LuMessageCircle className="h-6 w-6" aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/95 shadow-2xl shadow-black/25 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2.5 border-b border-black/10 bg-gradient-to-b from-black/[0.03] to-transparent px-4 py-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
                <LuSparkles className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-black">Ask about Atharv</p>
                <p className="truncate text-xs text-black/50">His work, skills &amp; projects — ask away.</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {messages.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="text-sm text-black/50"
                >
                  Try asking: &ldquo;What has Atharv worked on recently?&rdquo; or &ldquo;What&apos;s his tech stack?&rdquo;
                </motion.p>
              ) : null}
              <AnimatePresence initial={false}>
                {messages.map((message, idx) => {
                  const isLast = idx === messages.length - 1;
                  if (isLast && message.role === "assistant" && message.content === "" && isWaitingForFirstToken) {
                    return (
                      <motion.div
                        key={idx}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <TypingIndicator />
                      </motion.div>
                    );
                  }
                  return (
                    <motion.div
                      key={idx}
                      layout
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                        message.role === "user"
                          ? "ml-auto bg-black text-white"
                          : "bg-black/5 text-black"
                      }`}
                    >
                      {message.content}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {error ? (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500"
                >
                  {error}
                </motion.p>
              ) : null}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void sendMessage();
              }}
              className="border-t border-black/10 bg-gradient-to-b from-black/[0.02] to-transparent p-3"
            >
              <div
                className={`flex items-end gap-1 rounded-[1.4rem] border bg-white px-2 py-2 shadow-sm transition-all duration-200 ${
                  isListening
                    ? "border-red-300 shadow-red-500/10 ring-2 ring-red-100"
                    : "border-black/10 focus-within:border-black/25 focus-within:shadow-md"
                }`}
              >
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => {
                    baseTextRef.current = e.target.value;
                    setInput(e.target.value.slice(0, MAX_INPUT_LENGTH));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void sendMessage();
                    }
                  }}
                  placeholder={isListening ? "Listening..." : "Ask something about Atharv..."}
                  disabled={isStreaming}
                  className="max-h-[120px] flex-1 resize-none bg-transparent px-2 py-1 text-sm leading-relaxed outline-none placeholder:text-black/35 disabled:opacity-60"
                />
                {speechSupported ? (
                  <motion.button
                    type="button"
                    onClick={toggleListening}
                    disabled={isStreaming}
                    aria-label={isListening ? "Stop voice input" : "Start voice input"}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors disabled:opacity-40 ${
                      isListening
                        ? "bg-red-500 text-white shadow-sm shadow-red-500/30"
                        : "bg-black/[0.04] text-black/60 hover:bg-black/[0.08] hover:text-black"
                    }`}
                  >
                    {isListening ? (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-red-500/40"
                        animate={{ scale: [1, 1.4, 1.4], opacity: [0.6, 0, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                      />
                    ) : null}
                    {isListening ? (
                      <LuMic className="relative h-4 w-4" aria-hidden />
                    ) : (
                      <LuMicOff className="relative h-4 w-4" aria-hidden />
                    )}
                  </motion.button>
                ) : null}
                <motion.button
                  type="submit"
                  disabled={isStreaming || !input.trim()}
                  aria-label="Send message"
                  whileHover={input.trim() ? { scale: 1.06 } : undefined}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    backgroundColor: input.trim() ? "#000000" : "rgba(0,0,0,0.08)",
                    color: input.trim() ? "#ffffff" : "rgba(0,0,0,0.35)",
                  }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm shadow-black/10 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  <LuSendHorizontal className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>
              <div className="flex items-center justify-between px-2 pt-1.5">
                <p className="text-[11px] text-black/35">
                  {isListening ? "Listening — pause to auto-send" : "Enter to send · Shift+Enter for a new line"}
                </p>
                {input.length > MAX_INPUT_LENGTH * 0.8 ? (
                  <p className={`text-[11px] tabular-nums ${input.length >= MAX_INPUT_LENGTH ? "text-red-500" : "text-black/35"}`}>
                    {input.length}/{MAX_INPUT_LENGTH}
                  </p>
                ) : null}
              </div>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
