import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes'

function App() {
  return (
    <div className='min-h-screen'>
      <RouterProvider router={AppRoutes} />
    </div>
  )
}

export default App
