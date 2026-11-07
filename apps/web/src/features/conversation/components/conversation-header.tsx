"use client";

import { SquarePen } from "lucide-react";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { IconButton } from "@/components/ui/IconButton"
import { Button } from "@/components/ui/Button"

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

      <Button
        title="新建对话"
        disabled={disabled || isCreating}
        onClick={onNewConversation}
      >
        <PlusCircleIcon
          size={18}
          weight="regular"
          aria-hidden="true"
        />

        {isCreating ? "正在创建…" : "新建对话"}
      </Button>
    </header>
  )
}

