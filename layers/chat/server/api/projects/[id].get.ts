import { getProjectByIdForUser } from '../../repository/projectRepository'
import { getAuthenticatedUserId } from '#layers/auth/server/utils/auth'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const userId = await getAuthenticatedUserId(event)

  const project = await getProjectByIdForUser(id, userId)

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found',
    })
  }

  return project
})
