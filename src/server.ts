import http from 'http'
import express, { Express } from 'express'
import { parse } from 'url'
import next from 'next'
import { Server as SocketIOServer } from 'socket.io'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import path from 'node:path'

import { rootDir } from './helpers/path'
import globalErrorHandler from './lib/server-err-handler'
import { getIOInstance, setIOInstance } from './lib/socket'
import { registerSocketHandlers } from './socket-handlers'
import { FRONTEND_ADDRESS, isDev, PORT } from './app-config'

dotenv.config()

const dev = isDev
const nextApp = next({ dev, turbopack: true })
const handle = nextApp.getRequestHandler()

let app: Express
let server: http.Server

nextApp.prepare().then(() => {
  app = express()
  server = http.createServer(app)

  app.use(express.static(path.join(rootDir, '../', 'public')))

  if (!isDev) {
    app.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
      }),
    )
  }
  app.use(
    cors({
      origin: isDev ? '*' : FRONTEND_ADDRESS,
      methods: ['PATCH', 'GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }),
  )

  app.get('/health', (_req, res) => {
    res.status(200).send('OK')
  })

  app.all('*', (req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  })

  app.use(globalErrorHandler)

  server.listen(PORT, () => {
    console.log(
      `> Server listening at http://localhost:${PORT} as ${dev ? 'development' : 'production'}`,
    )
  })

  const io = new SocketIOServer(server, {
    cors: {
      origin: isDev ? '*' : FRONTEND_ADDRESS,
      credentials: true,
    },
    transports: ['websocket', 'polling'],
    connectTimeout: 10000,
    pingTimeout: 5000,
    pingInterval: 25000,
  })

  io.on('connection', async (socket) => {
    console.log('A user connected:', socket.handshake.address)

    registerSocketHandlers(socket)

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.handshake.address)
    })
  })

  setIOInstance(io)
})

process.on('uncaughtException', (err: any) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

process.on('unhandledRejection', (err: any) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  server?.close(() => {
    nextApp.close()
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully')
  server?.close(() => {
    const io = getIOInstance()
    io?.close()
    nextApp.close()
    console.log('💥 Process terminated!')
  })
})
