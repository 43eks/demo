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

  /* 送信ハンドラ（ここにご提示のコードを組み込み） */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    // ユーザー発言を即追加
    setMessages((m) => [
      ...m,
      { role: "user", content: input },
      { role: "assistant", content: "" },
    ]);
    const prompt = input;
    setInput("");

    /* ストリーミング受信 */
    const res = await fetch("/api/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1].content += chunk;
        return copy;
      });
    }
  }

  /* UI 本体 */
  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-2xl flex-col bg-gray-100">
      {/* メッセージ一覧 */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-4 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow ${
                m.role === "user"
                  ? "rounded-br-none bg-blue-700 text-white"
                  : "rounded-bl-none bg-gray-300 text-gray-900"
              }`}
            >
              {m.content || <span className="animate-pulse">…</span>}
            </div>
          </div>
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
          placeholder="メッセージを入力j…"
          className="peer w-full resize-none rounded-lg border px-3 py-2 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="grid h-10 w-10 place-items-center rounded-lg bg-blue-700 text-white transition hover:bg-blue-800 disabled:opacity-50"
        >
          {/* シンプルな紙飛行機アイコン */}
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