import type { Server as SocketIOServerType } from 'socket.io'

let _io: SocketIOServerType

export const setIOInstance = (ioInstance: SocketIOServerType) => {
  _io = ioInstance
}

export const getIOInstance = (): SocketIOServerType => {
  if (!_io) throw new Error('Socket.io instance not initialized!')
  return _io
}
