import { updateChat } from '../layers/chat/server/repository/chatRepository'
import { UpdateChatSchema } from '../layers/chat/server/schemas'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const { success, data } = await readValidatedBody(
    event,
    UpdateChatSchema.safeParse
  )

  if (!success) {
    return 400
  }

  const storage = useStorage('db')
  await storage.setItem('chats:has-new-chat', true)

  return updateChat(id, data)
})
