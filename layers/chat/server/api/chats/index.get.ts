import { getAllChats } from '../../repository/chatRepository'

export default defineCachedEventHandler(
  async (event) => {
    const userId = await getAuthenticatedUserId(event)

    const storage = useStorage('db')
    await storage.setItem(
      `chats:has-new-chat:${userId}`,
      false
    )

    return getAllChats()
  },
  {
    name: 'getAllChats',
    maxAge: 0,
    swr: false,
    async shouldInvalidateCache(event) {
      const userId = await getAuthenticatedUserId(event)

      const storage = useStorage('db')
      const hasNewChat = await storage.getItem<boolean>(
        `chats:has-new-chat:${userId}`
      )
      return hasNewChat || false
    },
  }
)
