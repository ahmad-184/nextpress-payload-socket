export const PORT = parseInt(process.env.PORT || '3000', 10)

export const isDev = process.env.NODE_ENV !== 'production'

export const FRONTEND_ADDRESS = process.env.FRONTEND_ADDRESS || 'http://localhost:3000'

export const SOCKET_EVENTS = {
  GET_POSTS: 'GET:POSTS',
  RECEIVE_POSTS: 'RECEIVE:POSTS',
  POST_CREATED: 'POST:CREATED',
  POST_UPDATED: 'POST:UPDATED',
  POST_DELETED: 'POST:DELETED',
}
