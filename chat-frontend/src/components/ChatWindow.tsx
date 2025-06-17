// src/components/ChatWindow.tsx
"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWindow() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  /* 自動スクロール */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* 送信 */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((m) => [...m, { role: "user", content: input }, { role: "assistant", content: "" }]);
    const prompt = input;
    setInput("");

    for (const ch of prompt) {
      await new Promise((r) => setTimeout(r, 40));
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1].content += ch.toUpperCase();
        return copy;
      });
    }
  }

  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-2xl flex-col bg-gray-100">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-white/90 px-4 backdrop-blur">
        <h1 className="text-lg font-semibold text-gray-900">AI Chat</h1>
      </header>

      {/* メッセージリスト */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.map((m, i) => (
          <ChatBubble key={i} msg={m} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 入力欄 */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 z-10 flex items-end gap-2 border-t bg-white/90 p-4 backdrop-blur"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="メッセージを入力…"
          className="peer w-full resize-none rounded-lg border px-3 py-2 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="grid h-10 w-10 place-items-center rounded-lg bg-blue-700 text-white transition hover:bg-blue-800 disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-translate-x-px rotate-45"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3.4 20.6 22 12 3.4 3.4 2 10l12 2-12 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

/* 吹き出し */
function ChatBubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      {/* アバター */}
      {!isUser && (
        <div className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
          AI
        </div>
      )}

      {/* バブル */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow ${
          isUser
            ? "rounded-br-none bg-blue-700 text-white"
            : "rounded-bl-none bg-gray-300 text-gray-900"
        }`}
      >
        {msg.content || <span className="animate-pulse">…</span>}
      </div>

      {/* ユーザー側アバター */}
      {isUser && (
        <div className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-500 text-xs font-semibold text-white">
          You
        </div>
      )}
    </div>
  );
}