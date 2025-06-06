import { v4 as uuidv4 } from 'uuid'
import { getProjectById } from './projectRepository'

const storage = useStorage<Chat[]>('db')
const chatsKey = 'chats:all'

async function getChats(): Promise<Chat[]> {
  let chats = await storage.getItem(chatsKey)

  // Initialize with mock data
  if (chats === null) {
    chats = [MOCK_CHAT]
    await saveChats(chats)
  }

  return chats
}

async function saveChats(chats: Chat[]): Promise<void> {
  await storage.setItem(chatsKey, chats)
}

export async function getAllChats(): Promise<Chat[]> {
  const chats = await getChats()

  let transformedChats = await Promise.all(
    chats.map(async (chat) => {
      const lastMessage = await getLastMessageForChat(
        chat.id
      )
      return {
        ...chat,
        messages: lastMessage ? [lastMessage] : [],
        project: chat.projectId
          ? (await getProjectById(chat.projectId)) ||
            undefined
          : undefined,
      }
    })
  )

  transformedChats = transformedChats.sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime()
  )

  return transformedChats
}

export async function createChat(data: {
  title?: string
  projectId?: string
}): Promise<ChatWithProject | null> {
  const now = new Date()
  const newChat: Chat = {
    id: uuidv4(),
    title: data.title || 'New Chat',
    projectId: data.projectId,
    messages: [],
    createdAt: now,
    updatedAt: now,
  }

  const chats = await getChats()
  chats.push(newChat)
  await saveChats(chats)

  const project = data.projectId
    ? await getProjectById(data.projectId)
    : null

  return {
    ...newChat,
    project,
  }
}

export async function getChatById(
  id: string
): Promise<(Chat & { project: Project | null }) | null> {
  const chats = await getChats()
  const chat = chats.find((c) => c.id === id)
  if (!chat) return null
  const lastMessage = await getLastMessageForChat(id)
  return {
    ...chat,
    messages: lastMessage ? [lastMessage] : [],
    project: chat.projectId
      ? await getProjectById(chat.projectId)
      : null,
  }
}

export async function updateChat(
  id: string,
  data: { title?: string; projectId?: string }
): Promise<ChatWithProject | null> {
  const chats = await getChats()

  const chatIndex = chats.findIndex((c) => c.id === id)
  if (chatIndex === -1) return null

  const chat = chats[chatIndex]
  if (!chat) return null

  const updatedChat: Chat = {
    ...chat,
    ...(data.title && { title: data.title }),
    ...(data.projectId !== undefined && {
      projectId: data.projectId,
    }),
    updatedAt: new Date(),
  }

  // Save updated chat
  chats[chatIndex] = updatedChat
  await saveChats(chats)

  const lastMessage = await getLastMessageForChat(id)

  // Return updated chat with last message and project
  return {
    ...updatedChat,
    messages: lastMessage ? [lastMessage] : [],
    project: updatedChat.projectId
      ? await getProjectById(updatedChat.projectId)
      : null,
  }
}

export async function deleteChat(
  id: string
): Promise<boolean> {
  const chats = await getChats()
  const index = chats.findIndex((chat) => chat.id === id)
  if (index !== -1) {
    chats.splice(index, 1)
    await saveChats(chats)
    return true
  }
  return false
}

export async function getMessagesByChatId(
  chatId: string
): Promise<Message[]> {
  const chats = await getChats()

  const chat = chats.find((c) => c.id === chatId)
  if (!chat) return []

  return [...chat.messages].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime()
  )
}

export async function createMessageForChat(data: {
  content: string
  role: 'user' | 'assistant'
  chatId: string
}): Promise<Message | null> {
  const chats = await getChats()

  const chatIndex = chats.findIndex(
    (c) => c.id === data.chatId
  )
  if (chatIndex === -1) return null

  const chat = chats[chatIndex]
  if (!chat) return null

  const now = new Date()
  const newMessage: Message = {
    id: uuidv4(),
    content: data.content,
    role: data.role,
    createdAt: now,
    updatedAt: now,
  }

  chat.messages.push(newMessage)
  chat.updatedAt = now

  chats[chatIndex] = chat
  await saveChats(chats)

  return newMessage
}

export async function deleteMessagesForChat(
  chatId: string
): Promise<void> {
  const chats = await getChats()
  const chatIndex = chats.findIndex((c) => c.id === chatId)
  if (chatIndex === -1) return

  const chat = chats[chatIndex]
  if (!chat) return

  chat.messages = []
  chat.updatedAt = new Date()

  chats[chatIndex] = chat
  await saveChats(chats)
}

export async function getLastMessageForChat(
  chatId: string
): Promise<Message | null> {
  const chats = await getChats()

  const chat = chats.find((c) => c.id === chatId)
  if (!chat || chat.messages.length === 0) return null

  const lastMessage = chat.messages.reduce((latest, msg) =>
    msg.createdAt > latest.createdAt ? msg : latest
  )

  return {
    ...lastMessage,
    createdAt: new Date(lastMessage.createdAt),
    updatedAt: new Date(lastMessage.updatedAt),
  }
}
