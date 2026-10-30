"use client";

import { ArrowUp } from "lucide-react";
import {
  FormEvent,
  KeyboardEvent,
  useState
} from "react"

interface ConversationComposerProps {
  isSending?: boolean;
  onSend: (content: string) => void | Promise<void>
}

export function ConversationComposer({
  isSending = false,
  onSend,
}: ConversationComposerProps) {
  const [content, setContent] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const submitMessage = async () => {
    const trimmedContent = content.trim()

    if (!trimmedContent || isSending) {
      return;
    }

    await onSend(trimmedContent);
    setContent("")
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    await submitMessage()
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const isConfirmingComposition = isComposing || event.nativeEvent.isComposing

    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !isConfirmingComposition
    ) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }


  }

  return (
    <form
      className="flex items-end gap-2 rounded-2xl border border-zinc-200 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-950"
      onSubmit={handleSubmit}
    >
      <textarea
        aria-label="输入消息"
        className="min-h-11 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-zinc-400"
        disabled={isSending}
        onChange={(event) => setContent(event.target.value)}
        onCompositionEnd={() => setIsComposing(false)}
        onCompositionStart={() => setIsComposing(true)}
        onKeyDown={handleKeyDown}
        placeholder="输入你想讨论的内容…"
        rows={1}
        value={content}
      />

      <button
        aria-label="发送消息"
        className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
        disabled={!content.trim() || isSending}
        type="submit"
      >
        <ArrowUp aria-hidden="true" size={18} />
      </button>
    </form>
  )
}


