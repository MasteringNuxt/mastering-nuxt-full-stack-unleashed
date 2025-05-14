import { createChat } from '../../repository/chatRepository'
import { CreateChatSchema } from '../../schemas'

export default defineEventHandler(async (event) => {
  const { success, data } = await readValidatedBody(
    event,
    CreateChatSchema.safeParse
  )

  if (!success) {
    return 400
  }

  const { title, projectId } = data

  const storage = useStorage('db')
  await storage.setItem('chats:has-new-chat', true)

  return createChat({
    title,
    projectId,
  })
})
