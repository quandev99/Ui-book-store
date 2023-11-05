import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes'
import {  Suspense } from 'react'
function App() {
  return (
    <div className='min-h-screen'>
      <Suspense fallback={<div className='text-2xl text-red-500 bg-blue-200'>Loading...</div>}>
        <RouterProvider router={AppRoutes} />
      </Suspense>
    </div>
  )
}

export default App
