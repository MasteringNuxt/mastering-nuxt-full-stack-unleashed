import type { Chat } from '../types'
import { MOCK_CHAT } from './mockData'

export default function useChats() {
  const chats = useState<Chat[]>('chats', () => [MOCK_CHAT])

  function createChat() {
    const id = (chats.value.length + 1).toString()
    const chat = {
      id,
      title: 'New Chat',
      messages: [],
    }

    chats.value.push(chat)

    return chat
  }

  return {
    chats,
    createChat,
  }
}
