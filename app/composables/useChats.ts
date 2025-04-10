import type { Chat } from '../types'
import { MOCK_CHAT } from './mockData'

export default function useChats() {
  const chats = useState<Chat[]>('chats', () => [MOCK_CHAT])

  function createChat(
    options: { projectId?: string } = {}
  ) {
    const id = (chats.value.length + 1).toString()
    const chat = {
      id,
      title: 'New Chat',
      messages: [],
      projectId: options.projectId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    chats.value.push(chat)

    return chat
  }

  function chatsInProject(projectId: string) {
    return chats.value.filter(
      (chat) => chat.projectId === projectId
    )
  }

  return {
    chats,
    createChat,
    chatsInProject,
  }
}
