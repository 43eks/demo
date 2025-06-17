// src/components/ChatWindow.tsx
"use client";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWindow() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  /* 自動スクロール */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;

    // ① ユーザー発言を即時描画
    setMessages((m) => [...m, { role: "user", content: input }, { role: "assistant", content: "" }]);
    const prompt = input;
    setInput("");

    // ② ダミー: 50 ms ごとに 1 文字ずつ“ストリーミング”表示（あとで API に置き換え）
    for (const ch of prompt) {
      await new Promise((r) => setTimeout(r, 50));
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1].content += ch;
        return copy;
      });
    }
  };

  return (
    <div className="mx-auto flex h-[90vh] w-full max-w-xl flex-col rounded-2xl bg-white shadow-lg">
      {/* メッセージリスト */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <span
              className={`inline-block rounded-lg px-3 py-2 text-sm ${
                m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {m.content || <span className="animate-pulse">…</span>}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 入力フォーム */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex gap-2 border-t p-3"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="メッセージを入力…"
          className="flex-1 resize-none rounded-lg border p-2 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          送信
        </button>
      </form>
    </div>
  );
}