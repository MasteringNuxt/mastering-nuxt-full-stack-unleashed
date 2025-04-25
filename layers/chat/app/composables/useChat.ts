import type { ChatMessage } from '../types'

export default function useChat(chatId: string) {
  const { chats } = useChats()
  const chat = computed(() =>
    chats.value.find((c) => c.id === chatId)
  )
  const messages = computed<ChatMessage[]>(
    () => chat.value?.messages || []
  )

  function createMessage(
    message: string,
    role: ChatMessage['role']
  ) {
    const id = messages.value.length.toString()

    return {
      id,
      role,
      content: message,
    }
  }

  async function sendMessage(message: string) {
    if (!chat.value) return
    messages.value.push(createMessage(message, 'user'))

    const data = await $fetch<ChatMessage>('/api/ai', {
      method: 'POST',
      body: {
        messages: messages.value,
      },
    })

    chat.value.updatedAt = new Date()
    messages.value.push(data)
  }

  return {
    chat,
    messages,
    sendMessage,
  }
}
