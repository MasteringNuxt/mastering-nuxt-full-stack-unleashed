import {
  createAnthropicModel,
  generateChatResponse,
} from '../services/ai-service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { messages } = body

  const id = messages.length.toString()

  const anthropicApiKey = useRuntimeConfig().anthropicApiKey
  const anthropicModel = createAnthropicModel(anthropicApiKey)

  const response = await generateChatResponse(
    anthropicModel,
    messages
  )

  return {
    id,
    role: 'assistant',
    content: response,
  }
})
