async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  if (!input.trim()) return;

  setMessages((m) => [...m, { role: "user", content: input }, { role: "assistant", content: "" }]);
  const prompt = input;
  setInput("");

  const res = await fetch("/api/stream", {
    method: "POST",
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