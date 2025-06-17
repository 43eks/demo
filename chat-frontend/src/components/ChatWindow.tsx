// src/components/ChatWindow.tsx
"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons"; // アイコン用（lucide-react でも可）

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWindow() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  /* ── 自動スクロール ───────────────────────── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ── 送信ハンドラ ─────────────────────────── */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    // ① ユーザー発言を追加
    setMessages((m) => [...m, { role: "user", content: input }, { role: "assistant", content: "" }]);
    const prompt = input;
    setInput("");

    // ② ダミーレスポンス (50ms ごとに 1 文字)
    for (const ch of prompt) {
      await new Promise((r) => setTimeout(r, 50));
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1].content += ch.toUpperCase(); // とりあえず大文字化して返す
        return copy;
      });
    }
    /* -- ここを fetch(`/api/stream`, …) に差し替えれば LLM 連携可能 -- */
  }

  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-2xl flex-col bg-muted/40">
      {/* ── ヘッダー ─────────────────────────── */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/60 px-4 backdrop-blur">
        <h1 className="text-lg font-semibold">AI Chat</h1>
      </header>

      {/* ── メッセージリスト ───────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.map((m, i) => (
          <ChatBubble key={i} msg={m} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* ── 入力欄 ───────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 z-10 flex items-end gap-2 border-t bg-background/60 p-4 backdrop-blur"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="メッセージを入力…"
          className="peer w-full resize-none rounded-lg border bg-background px-3 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground transition disabled:opacity-50"
        >
          <PaperPlaneIcon className="-translate-x-px rotate-45" />
        </button>
      </form>
    </div>
  );
}

/* ── 個別バブルコンポーネント ───────────────── */
function ChatBubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      {/* アバター */}
      {!isUser && (
        <div className="mr-2 h-8 w-8 shrink-0 rounded-full bg-primary text-center text-xs leading-8 text-primary-foreground">
          AI
        </div>
      )}

      {/* 吹き出し */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-popover text-foreground rounded-bl-none"
        }`}
      >
        {msg.content || <span className="animate-pulse">…</span>}
      </div>

      {/* ユーザー側アバター */}
      {isUser && (
        <div className="ml-2 h-8 w-8 shrink-0 rounded-full bg-muted text-center text-xs leading-8 text-foreground">
          You
        </div>
      )}
    </div>
  );
}