export default function useChat(chatId: string) {
  const { chats } = useChats()
  const chat = computed(() =>
    chats.value.find((c) => c.id === chatId)
  )

  const messages = computed<Message[]>(
    () => chat.value?.messages || []
  )

  const { data, execute, status } = useFetch<Message[]>(
    `/api/chats/${chatId}/messages`,
    {
      default: () => [],
      immediate: false,
      headers: useRequestHeaders(['cookie']),
    }
  )

  async function fetchMessages({
    refresh = false,
  }: {
    refresh?: boolean
  } = {}) {
    const hasExistingMessages = messages.value.length > 1
    const isRequestInProgress = status.value !== 'idle'
    const shouldSkipDueToExistingState =
      !refresh &&
      (hasExistingMessages || isRequestInProgress)

    if (shouldSkipDueToExistingState || !chat.value) {
      return
    }

    await execute()
    chat.value.messages = data.value
  }

  async function generateChatTitle(message: string) {
    if (!chat.value) return

    const updatedChat = await $fetch<Chat>(
      `/api/chats/${chatId}/title`,
      {
        method: 'POST',
        headers: useRequestHeaders(['cookie']),
        body: {
          message,
        },
      }
    )
    chat.value.title = updatedChat.title
  }

  async function sendMessage(message: string) {
    if (!chat.value) return

    if (messages.value.length === 0) {
      generateChatTitle(message)
    }

    const optimisticUserMessage: Message = {
      id: `optimistic-user-message-${Date.now()}`,
      role: 'user',
      content: message,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    messages.value.push(optimisticUserMessage)

    const userMessageIndex = messages.value.length - 1

    try {
      const newMessage = await $fetch<Message>(
        `/api/chats/${chatId}/messages`,
        {
          method: 'POST',
          headers: useRequestHeaders(['cookie']),
          body: {
            content: message,
            role: 'user',
          },
        }
      )
      messages.value[userMessageIndex] = newMessage
    } catch (error) {
      console.error('Error sending user message', error)
      messages.value.splice(userMessageIndex, 1)
      return
    }

    messages.value.push({
      id: `streaming-message-${Date.now()}`,
      role: 'assistant',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const lastMessage = messages.value[
      messages.value.length - 1
    ] as Message

    try {
      const response = await $fetch<ReadableStream>(
        `/api/chats/${chatId}/messages/stream`,
        {
          method: 'POST',
          responseType: 'stream',
          headers: useRequestHeaders(['cookie']),
          body: {
            messages: messages.value,
          },
        }
      )

      const decodedStream = response.pipeThrough(
        new TextDecoderStream()
      )

      const reader = decodedStream.getReader()
      await reader
        .read()
        .then(function processText({
          done,
          value,
        }): Promise<void> | void {
          if (done) {
            return
          }

          lastMessage.content += value
          return reader.read().then(processText)
        })
    } catch (error) {
      console.error('Error streaming message:', error)
    } finally {
      await fetchMessages({ refresh: true })
    }

    chat.value.updatedAt = new Date()
  }

  async function assignToProject(projectId: string | null) {
    if (!chat.value) return

    const originalProjectId = chat.value.projectId

    // Optimistically update the chat
    chat.value.projectId = projectId || null

    try {
      const updatedChat = await $fetch<Chat>(
        `/api/chats/${chatId}`,
        {
          method: 'PUT',
          headers: useRequestHeaders(['cookie']),
          body: {
            projectId,
          },
        }
      )

      // Update the chat in the chats list
      const chatIndex = chats.value.findIndex(
        (c) => c.id === chatId
      )
      if (chatIndex !== -1 && chats.value[chatIndex]) {
        chats.value[chatIndex].projectId =
          updatedChat.projectId
        chats.value[chatIndex].updatedAt =
          updatedChat.updatedAt
      }
    } catch (error) {
      console.error(
        'Error assigning chat to project',
        error
      )
      // Revert optimistic update
      chat.value.projectId = originalProjectId
      throw error
    }
  }

  return {
    chat,
    messages,
    sendMessage,
    fetchMessages,
    assignToProject,
  }
}
