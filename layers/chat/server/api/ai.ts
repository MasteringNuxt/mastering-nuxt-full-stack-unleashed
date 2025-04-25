import {
  createOpenAIModel,
  generateChatResponse,
} from '../services/ai-service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { messages } = body

  const id = messages.length.toString()

  const openaiApiKey = useRuntimeConfig().openaiApiKey
  const openaiModel = createOpenAIModel(openaiApiKey)

  const response = await generateChatResponse(
    openaiModel,
    messages
  )

  return {
    id,
    role: 'assistant',
    content: response,
  }
})
