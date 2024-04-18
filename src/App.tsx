import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes'
import React, {  Suspense } from 'react'
import { LoadingPage } from './components/loading/LoadingPage'
import { fetchToken, onMessageListener } from './firebase/config'
import { io } from 'socket.io-client'
export const socketIO = io(import.meta.env.VITE_API_URL, {
  transports: ['websocket']
})
function App() {
  const [show, setShow] = React.useState(false)
  const [notification, setNotification] = React.useState({ title: '', body: '' })
  const [isTokenFound, setTokenFound] = React.useState(false)

  React.useEffect(() => {
    fetchToken(setTokenFound)
  }, [])

  onMessageListener()
    .then((payload) => {
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body })
      setShow(true)
      console.log(payload)
    })
    .catch((err) => console.log('failed: ', err))

  const onShowNotificationClicked = () => {
    setNotification('Notification', { title: 'Notification', body: 'This is a test notification' })
    setShow(true)
  }
  return (
    <div className='min-h-screen'>
      <Suspense fallback={<LoadingPage />}>
        <header className='App-header'>
          {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
          {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        </header>
        <RouterProvider router={AppRoutes} />
      </Suspense>
    </div>
  )
}

export default App
