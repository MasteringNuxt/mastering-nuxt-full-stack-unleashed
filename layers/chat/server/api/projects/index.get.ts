import { getAllProjectsByUser } from '../../repository/projectRepository'
import { getAuthenticatedUserId } from '#layers/auth/server/utils/auth'

export default defineEventHandler(async (event) => {
  const userId = await getAuthenticatedUserId(event)
  
  return getAllProjectsByUser(userId)
})
