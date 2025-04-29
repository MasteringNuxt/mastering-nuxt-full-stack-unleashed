import { updateChat } from '../../../repository/chatRepository'
import {
  createOpenAIModel,
  generateChatTitle,
} from '../../../services/ai-service'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const { message } = await readBody(event)

  const model = createOpenAIModel(
    useRuntimeConfig().openaiApiKey
  )
  const title = await generateChatTitle(model, message)

  return updateChat(id, { title })
})
