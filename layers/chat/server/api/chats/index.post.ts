import { createChat } from '../../repository/chatRepository'

export default defineEventHandler(async (event) => {
  const { title, projectId } = await readBody(event)

  return createChat({
    title,
    projectId,
  })
})
