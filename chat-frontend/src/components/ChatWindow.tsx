async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  if (!input.trim()) return;

  // ユーザー発言を即追加
  setMessages(m => [...m, { role: "user", content: input }, { role: "assistant", content: "" }]);
  const prompt = input;
  setInput("");

  /* ↓↓ ストリーミング受信に差し替え ↓↓ */
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
    setMessages(m => {
      const copy = [...m];
      copy[copy.length - 1].content += chunk;
      return copy;
    });
  }
}