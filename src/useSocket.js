import { io } from 'socket.io-client'

const server_url = 'https://tenbinn.onrender.com/'

export const socket = io(server_url)
