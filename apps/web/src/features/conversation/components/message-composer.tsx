"use client";

import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

type MessageComposerProps = {
  value: string;
  onValueChange: (value: string) => void;
  onSend: () => void;
}


export function MessageComposer({
  value,
  onValueChange,
  onSend
}: MessageComposerProps) {
  return (<form
    className="flex items-end gap-2"
    onSubmit={(event) => {
      event.preventDefault()
      if (!value.trim()) return;
      onSend()
    }}
  >
    <Textarea
      className="flex-1"
      aria-label="信息内容"
      placeholder="输入信息..."
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      onKeyDown={(event) => {
        // 中文输入法确认候选词时，不触发发送
        if (
          event.nativeEvent.isComposing ||
          event.nativeEvent.keyCode === 229
        ) return

        // 只处理单独按下 Enter; Shift + Enter 保留默认换行
        if (
          event.key !== "Enter" ||
          event.shiftKey ||
          event.ctrlKey ||
          event.altKey ||
          event.metaKey
        ) return;

        event.preventDefault()

        // 长按 Enter 时，不重复提交
        if (event.repeat) return;

        event.currentTarget.form?.requestSubmit()
      }}
    />
    <Button
      type="submit"
      size="sm"
      shape="pill"
      disabled={!value.trim()}
    >
      发送
    </Button>
  </form>)
}
