import {
  updateChat,
  getChatByIdForUser,
} from '../../../repository/chatRepository'
import {
  createOpenAIModel,
  generateChatTitle,
} from '../../../services/ai-service'
import { UpdateChatTitleSchema } from '../../../schemas'
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
    UpdateChatTitleSchema.safeParse
  )

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }

  const model = createOpenAIModel(
    useRuntimeConfig().openaiApiKey
  )
  const title = await generateChatTitle(model, data.message)

  return updateChat(id, { title })
})
