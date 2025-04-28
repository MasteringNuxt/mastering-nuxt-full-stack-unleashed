import { getAllChats } from '../../repository/chatRepository'

export default defineEventHandler(async (_event) => {
  return getAllChats()
})
