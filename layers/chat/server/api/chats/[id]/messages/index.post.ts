import {
  createMessageForChat,
  getChatByIdForUser,
} from '../../../../repository/chatRepository'
import { CreateMessageSchema } from '../../../../schemas'
import { getAuthenticatedUserId } from '#layers/auth/server/utils/auth'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const userId = await getAuthenticatedUserId(event)

  // Verify user owns the chat
  const chat = await getChatByIdForUser(id, userId)
  if (!chat) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Chat not found',
    })
  }

  const { success, data } = await readValidatedBody(
    event,
    CreateMessageSchema.safeParse
  )

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }

  return createMessageForChat({
    chatId: id,
    content: data.content,
    role: data.role,
  })
})
