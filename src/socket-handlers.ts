import type { Socket } from 'socket.io'
import { getLocalApi } from './lib/get-local-api'
import { SOCKET_EVENTS } from './app-config'

export const registerSocketHandlers = async (socket: Socket) => {
  const localApi = await getLocalApi()

  socket.on(SOCKET_EVENTS.GET_POSTS, async () => {
    const posts = await localApi.find({
      collection: 'posts',
    })
    socket.emit(SOCKET_EVENTS.RECEIVE_POSTS, posts.docs)
  })
}
