"use client";

import { useState } from "react";
import { MessageComposer } from "./message-composer";

export function ConversationWorkspace() {

  const [draft, setDraft] = useState("");

  function handleSend() {
    const content = draft.trim()
    if (!content) return;

    console.log("准备发送：", content);

    setDraft("")
  }

  return (
    <div className="mx-auto flex h-full max-w-[736px] flex-col">
      <div className="flex-1">
        <p>你好，我是广莫。你现在最想理清或推进什么？</p>
      </div>

      <MessageComposer
        value={draft}
        onValueChange={setDraft}
        onSend={handleSend}
      />
    </div>
  )
}
