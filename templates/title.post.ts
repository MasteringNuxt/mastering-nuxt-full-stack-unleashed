import { updateChat } from '../../../repository/chatRepository'
import {
  createOpenAIModel,
  generateChatTitle,
} from '../../../services/ai-service'
import { UpdateChatTitleSchema } from '../../../schemas'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const { success, data } = await readValidatedBody(
    event,
    UpdateChatTitleSchema.safeParse
  )

  if (!success) {
    return 400
  }

  const model = createOpenAIModel(
    useRuntimeConfig().openaiApiKey
  )
  const title = await generateChatTitle(model, data.message)

  return updateChat(id, { title })
})
