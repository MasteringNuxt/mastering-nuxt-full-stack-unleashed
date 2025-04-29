import { getAllProjects } from '../../repository/projectRepository'

export default defineEventHandler(async (_event) => {
  return getAllProjects()
})
