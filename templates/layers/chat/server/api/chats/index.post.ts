import { createChat } from '../../repository/chatRepository'
import { CreateChatSchema } from '../../schemas'
import { getAuthenticatedUserId } from '#layers/auth/server/utils/auth'

export default defineEventHandler(async (event) => {
  const userId = await getAuthenticatedUserId(event)

  const { success, data } = await readValidatedBody(
    event,
    CreateChatSchema.safeParse
  )

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }

  const { title, projectId } = data

  const storage = useStorage('db')
  await storage.setItem(
    `chats:has-new-chat:${userId}`,
    true
  )

  return createChat({
    title,
    projectId,
    userId,
  })
})
