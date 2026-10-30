import type { Conversation, ConversationMessage } from "@guangmo/domain"

export interface CreateConversationInput {
  title?: string
}

export interface SendMessageInput {
  conversationId: string
  content: string
}

export interface ConversationService {
  listConversations(): Promise<Conversation[]>; // 供顶部历史入口读取会话
  getConversation(id: string): Promise<Conversation | null>; // 供对话页加载当前会话
  createConversation(
    input?: CreateConversationInput
  ): Promise<Conversation>; //供“新建对话”创建空会话
  sendMessage(
    input: SendMessageInput
  ): Promise<ConversationMessage[]>; // 发送用户文本后，返回本次新增的消息；模拟实现会返回用户消息和助手回复。
}
