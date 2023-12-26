import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes'
import {  Suspense } from 'react'
import { LoadingPage } from './components/loading/LoadingPage'
function App() {
  return (
    <div className='min-h-screen'>
      <Suspense fallback={<LoadingPage/>}>
        <RouterProvider router={AppRoutes} />
      </Suspense>
    </div>
  )
}

export default App
