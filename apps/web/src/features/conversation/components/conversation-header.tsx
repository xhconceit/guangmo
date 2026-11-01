"use client";

import { SquarePen } from "lucide-react";

interface ConversationHeaderProps {
  disabled?: boolean;
  isCreating?: boolean;
  onNewConversation?: () => void;
}


export function ConversationHeader({
  disabled = false,
  isCreating = false,
  onNewConversation
}: ConversationHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3">
      <h2 className="text-sm font-medium">对话</h2>

      <button
        className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-sm transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:hover:bg-zinc-800"
        disabled={disabled}
        onClick={onNewConversation}
        type="button"
      >
        <SquarePen aria-hidden="true" size={16} />
        {isCreating ? "正在创建..." : "新建对话"}
      </button>
    </header>
  )
}

