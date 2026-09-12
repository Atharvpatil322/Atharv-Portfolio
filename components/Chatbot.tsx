"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuMessageCircle, LuSendHorizontal, LuSparkles, LuX } from "react-icons/lu";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_INPUT_LENGTH = 600;

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, isStreaming]);

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

    setError(null);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
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
              className="flex items-center gap-2 border-t border-black/10 p-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                placeholder="Ask something about Atharv..."
                disabled={isStreaming}
                className="flex-1 rounded-full border border-black/15 px-3 py-2 text-sm outline-none transition focus:border-black/30 focus:ring-2 focus:ring-black/5 disabled:opacity-60"
              />
              <motion.button
                type="submit"
                disabled={isStreaming || !input.trim()}
                aria-label="Send message"
                whileTap={{ scale: 0.9 }}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white transition disabled:opacity-40"
              >
                <LuSendHorizontal className="h-4 w-4" aria-hidden />
              </motion.button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
