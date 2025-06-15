"use client";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWindow() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  /* 自動スクロール */
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const send = async () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", content: input }, { role: "assistant", content: "" }]);
    setInput("");

    /* ダミー：入力文字を 50 ms ごとにストリーム */
    for (const ch of input) {
      await new Promise((r) => setTimeout(r, 50));
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1].content += ch;
        return copy;
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white shadow-lg rounded-2xl flex flex-col h-[90vh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <span
              className={`inline-block px-3 py-2 rounded-lg text-sm ${
                m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {m.content || <span className="animate-pulse">...</span>}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="border-t p-3 flex gap-2"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="メッセージを入力…"
          className="flex-1 resize-none border rounded-lg p-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          disabled={!input.trim()}
        >
          送信
        </button>
      </form>
    </div>
  );
}