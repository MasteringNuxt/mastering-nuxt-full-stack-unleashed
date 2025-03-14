export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { messages } = body

  const id = messages.length.toString()
  const lastMessage = messages[messages.length - 1]

  return {
    id,
    role: 'assistant',
    content: `(server) You said: ${lastMessage.content}`,
  }
})
