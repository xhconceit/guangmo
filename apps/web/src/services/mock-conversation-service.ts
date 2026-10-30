import type {
  Conversation,
  ConversationMessage,
} from "@guangmo/domain";

import type {
  ConversationService,
  CreateConversationInput,
  SendMessageInput,
} from "./conversation-service"

const now = () => new Date().toISOString()

const createId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

const cloneConversation = (conversation: Conversation): Conversation => ({
  ...conversation,
  messages: conversation.messages.map((message) => ({ ...message }))
})


let conversations: Conversation[] = [
  {
    id: 'conversation-welcome',
    title: '开始使用广莫',
    createdAt: now(),
    updatedAt: now(),
    messages: [
      {
        id: "message-welcome",
        conversationId: "conversation-welcome",
        role: "assistant",
        content: "你好，我是广莫。你现在最想理清或推进什么？",
        createdAt: now(),
      },
    ]
  }
]


export const mockConversationService: ConversationService = {
  async listConversations() {
    return conversations.map(cloneConversation).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  },
  async getConversation(id) {
    const conversation = conversations.find(item => item.id === id)
    return conversation ? cloneConversation(conversation) : null
  },
  async createConversation(input?: CreateConversationInput) {
    const timestamp = now()

    const conversation: Conversation = {
      id: createId("conversation"),
      title: input?.title?.trim() || "新对话",
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: []
    }

    conversations = [conversation, ...conversations]
    return cloneConversation(conversation)
  },
  async sendMessage(input: SendMessageInput) {
    const content = input.content.trim()
    if (!content) {
      throw new Error("信息内容不能为空。");
    }
    const conversation = conversations.find((item) => item.id === input.conversationId)

    if (!conversation) {
      throw new Error("对话不存在");
    }

    const userMessage: ConversationMessage = {
      id: createId("message"),
      conversationId: input.conversationId,
      role: "user",
      content,
      createdAt: now(),
    };

    const assistantMessage: ConversationMessage = {
      id: createId("message"),
      conversationId: conversation.id,
      role: "assistant",
      content: `我收到了：“${content}”。我们可以先把它拆成一个清晰、可执行的小步骤。`,
      createdAt: now()
    }

    conversation.messages.push(userMessage, assistantMessage)
    conversation.updatedAt = assistantMessage.createdAt

    if (conversation.title === '新对话') {
      conversation.title = content.slice(0, 2)
    }

    return [{...userMessage}, {...assistantMessage}]
  }
}
