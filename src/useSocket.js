import { io } from 'socket.io-client'

const server_url = 'http://localhost:3000/'

export const socket = io(server_url)
