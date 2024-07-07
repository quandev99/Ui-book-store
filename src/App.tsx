import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes'
import React, {  Suspense } from 'react'
import { LoadingPage } from './components/loading/LoadingPage'
import { getUserData } from './store/helper/getDataLocalStorage'
import io from 'socket.io-client'
import { fetchTokenComponent, onMessageListener, useGenerateRegistrationToken } from './firebase/config'
import { useGetOneNotificationTokenQuery } from './app/services/notificationToken'
const apiUrl = import.meta.env.VITE_API_URL
const baseUrl = new URL(apiUrl).origin
export const socket = io(baseUrl, {
  transports: ['websocket']
})
function App() {
  const { user, tokens } = getUserData()
  const userId = user?._id
    React.useEffect(() => {
      if (userId) {
        socket.emit('authenticate', userId)
      }
      // Ngắt kết nối khi component bị hủy
      return () => {
        socket.disconnect()
      }
    }, [userId])
 React.useEffect(() => {
   
}, [])

useGenerateRegistrationToken()
React.useEffect(() => {
  fetchTokenComponent()
}, [])

// onMessageListener()
//   .then((payload) => {
//     console.log(payload)
//   })
//   .catch((err) => console.log('failed: ', err))


  return (
    <div className='min-h-screen'>
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={AppRoutes} />
      </Suspense>
    </div>
  )
}

export default App
