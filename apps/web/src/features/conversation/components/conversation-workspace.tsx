"use client";

import type { Conversation } from "@guangmo/domain";
import { useEffect, useRef, useState } from "react";

import { mockConversationService } from "../../../services/mock-conversation-service";
import { ConversationComposer } from "./conversation-composer";
import { ConversationHeader } from "./conversation-header";
import { ConversationMessageList } from "./conversation-message-list";

export function ConversationWorkspace() {
  const [conversation, setConversation] =
    useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const busyRef = useRef(false);
  const isBusy = isSending || isCreating;

  useEffect(() => {
    let cancelled = false;

    async function loadConversation() {
      try {
        const conversations =
          await mockConversationService.listConversations();

        if (!cancelled) {
          setConversation(conversations[0] ?? null);
        }
      } catch (error: unknown) {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "加载对话失败，请刷新页面重试。",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadConversation();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreate = async () => {
    if (busyRef.current) {
      return;
    }

    busyRef.current = true;
    setIsCreating(true);
    setError(null);

    try {
      const created =
        await mockConversationService.createConversation();

      setConversation(created);
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "创建对话失败，请重试。",
      );
    } finally {
      busyRef.current = false;
      setIsCreating(false);
    }
  };

  const handleSend = async (content: string): Promise<boolean> => {
    if (!conversation || busyRef.current) {
      return false;
    }

    const conversationId = conversation.id;

    busyRef.current = true;
    setIsSending(true);
    setError(null);

    try {
      const messages =
        await mockConversationService.sendMessage({
          conversationId,
          content,
        });

      setConversation((current) => {
        if (!current || current.id !== conversationId) {
          return current;
        }

        const lastMessage = messages[messages.length - 1];

        return {
          ...current,
          messages: [...current.messages, ...messages],
          updatedAt: lastMessage?.createdAt ?? current.updatedAt,
        };
      });

      return true;
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "发送失败，请重试。",
      );

      return false;
    } finally {
      busyRef.current = false;
      setIsSending(false);
    }
  };

  if (isLoading) {
    return <p role="status">正在加载对话…</p>;
  }

  return (
    <section
      aria-label="当前对话"
      className="mx-auto flex w-full max-w-3xl flex-col gap-6"
    >
      <ConversationHeader
        disabled={isBusy}
        isCreating={isCreating}
        onNewConversation={handleCreate}
      />

      {error && (
        <p role="alert" className="text-sm">
          {error}
        </p>
      )}

      {conversation ? (
        <>
          <ConversationMessageList
            messages={conversation.messages}
          />

          {isSending && (
            <p role="status" className="text-sm text-zinc-500">
              正在回复…
            </p>
          )}

          <ConversationComposer
            key={conversation.id}
            isSending={isBusy}
            onSend={handleSend}
          />
        </>
      ) : (
        <p>暂无对话，点击“新建对话”开始。</p>
      )}
    </section>
  );
}
