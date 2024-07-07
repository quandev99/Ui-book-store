import { io } from 'socket.io-client'

// Khởi tạo kết nối socket tới máy chủ WebSocket
const socket = io('http://localhost:2605', {
  transports: ['websocket'],
// path: '/SERVERPATH',
//   forceNew: true,
//   reconnectionAttempts: 3,
//   timeout: 2000,
})

// Xác thực khi kết nối thành công
// socket.on('connection', () => {
//   console.log('Socket connected')
// })

// Ngắt kết nối khi component bị hủy
// socket.on('disconnect', () => {
//   console.log('Socket disconnected')
// })

export default socket
