"use client";

import { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function handleSend() {
    if (!message.trim() || isThinking) return;

    const currentMessage = message;

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: "user", content: currentMessage },
    ]);

    setMessage("");
    setIsThinking(true);

    setTimeout(() => {
      const reply = `建议：先为这件事留出一段完整时间。

依据：你刚刚提到“${currentMessage}”。重要的事常常不是没有想法，而是没有被放进现实安排。

下一步：今天先决定一个 45 分钟的时间段，只做最小的第一步。`;

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: reply },
      ]);

      setIsThinking(false);
    }, 800);
  }

  return (
    <main>
      <h1>广莫</h1>
      <p>今天，想从哪里开始？</p>

      <div className="messages">
        {messages.map((item, index) => (
          <p key={index} className={`message ${item.role}`}>
            {item.content}
          </p>
        ))}

        {isThinking && <p className="message assistant">广莫正在整理你的想法……</p>}
      </div>

      <textarea
        placeholder="有什么想法，和广莫聊聊"
        rows={4}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />

      <div className="prompts">
        <button onClick={() => setMessage("帮我看看，这周还有什么时间可以准备摄影项目？")}>
          这周什么时候可以拍摄？
        </button>

        <button onClick={() => setMessage("我正在考虑接一个新项目，帮我分析一下取舍。")}>
          一起分析一个决定
        </button>

        <button onClick={() => setMessage("我想研究 AI 对创作的影响，先帮我明确几个问题。")}>
          研究一个感兴趣的问题
        </button>
      </div>

      <button onClick={handleSend} disabled={isThinking}>
        {isThinking ? "思考中…" : "发送"}
      </button>
    </main>
  );
}