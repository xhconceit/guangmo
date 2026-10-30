import type { ConversationMessage } from "@guangmo/domain"

interface ConversationMessageListProps {
  messages: ConversationMessage[]
}

export function ConversationMessageList({
  messages,
}: ConversationMessageListProps) {
  if (messages.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        说说你现在想理清或推进的事。
      </p>
    )
  }

  return (
    <ol
      aria-label="对话信息"
      className="flex flex-col gap-4"
    >
      {
        messages.map(message => (
          <li
            key={message.id}
            className={
              message.role === "user"
                ? "self-end"
                : "self-start"
            }
          >
            <article
              className={
                message.role === "user"
                  ? "rounded-2xl bg-zinc-900 px-4 py-3 text-sm text-white dark:bg-zinc-100 dark:text-zinc-950"
                  : "rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
              }
            >
              <p className="whitespace-pre-wrap">
                {message.content}
              </p>
            </article>
          </li>
        ))
      }
    </ol>
  )
}
