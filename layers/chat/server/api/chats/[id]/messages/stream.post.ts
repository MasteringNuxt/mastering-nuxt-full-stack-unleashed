import {
  getMessagesByChatId,
  createMessageForChat,
} from '../../../../repository/chatRepository'
import {
  createOpenAIModel,
  streamChatResponse,
} from '../../../../services/ai-service'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const history = await getMessagesByChatId(id)

  const openai = createOpenAIModel(
    useRuntimeConfig().openaiApiKey
  )
  const stream = await streamChatResponse(openai, history)

  setResponseHeaders(event, {
    'Content-Type': 'text/html',
    'Cache-Control': 'no-cache',
    'Transfer-Encoding': 'chunked',
  })

  let completeResponse = ''

  const transformStream = new TransformStream({
    transform(chunk, controller) {
      completeResponse += chunk
      controller.enqueue(chunk)
    },

    async flush() {
      await createMessageForChat({
        chatId: id,
        content: completeResponse,
        role: 'assistant',
      })
    },
  })

  return stream.pipeThrough(transformStream)
})
