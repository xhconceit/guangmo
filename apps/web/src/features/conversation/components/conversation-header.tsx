"use client";

import { PlusCircleIcon, DotsThreeIcon, ClockCounterClockwiseIcon, MoonIcon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button"
import { IconButton } from "@/components/ui/IconButton"


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

      <div className="flex items-center gap-2 max-sm:gap-0">

        <Button
          title="新建对话"
          aria-label={isCreating ? "正在创建对话" : "新建对话"}
          variant="soft"
          size="sm"
          className="whitespace-nowrap"
          disabled={disabled || isCreating}
          onClick={onNewConversation}
        >
          <PlusCircleIcon
            size={18}
            weight="regular"
            className="shrink-0"
            aria-hidden="true"
          />

          <span className="max-sm:hidden">
            {isCreating ? "正在创建…" : "新建对话"}
          </span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          title="历史对话"
          aria-label="历史对话"
          className="
            whitespace-nowrap
            max-sm:size-[34px]
            max-sm:p-2
          "
        >
          <ClockCounterClockwiseIcon
            size={18}
            weight="regular"
            className="shrink-0"
            aria-hidden="true"
          />
          <span className="max-sm:hidden">
            历史对话
          </span>
        </Button>


        <IconButton size="sm" label="切换暗色主题" title="切换暗色主题">
          <MoonIcon weight="regular" aria-hidden="true" />
        </IconButton>

        <IconButton size="sm" label="关于此原型" title="关于此原型">
          <DotsThreeIcon weight="regular" aria-hidden="true" />
        </IconButton>

      </div>

    </header>
  )
}

