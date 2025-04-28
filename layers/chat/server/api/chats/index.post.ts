import { createChat } from '../../repository/chatRepository'

export default defineEventHandler(async (_event) => {
  return createChat({
    title: 'New Chat',
  })
})
