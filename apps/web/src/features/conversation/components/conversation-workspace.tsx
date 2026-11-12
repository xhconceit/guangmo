"use client";

import React, { useState } from "react";

export function ConversationWorkspace() {

  const [draft, setDraft] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;

    console.log("准备发送：", draft.trim());

    setDraft("")
  }

  return (
    <div className="mx-auto flex h-full max-w-[736px] flex-col">
      <div className="flex-1">
        <p>你好，我是广莫。你现在最想理清或推进什么？</p>
      </div>

      <form className="flex items-end gap-2" onSubmit={handleSubmit}>
        <textarea aria-label="信息内容" placeholder="输入信息..." value={draft} onChange={(event) => setDraft(event.target.value)} />
        <button type="submit" >发送</button>
      </form>
    </div>
  )
}
