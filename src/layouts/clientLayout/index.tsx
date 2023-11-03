import { Outlet } from 'react-router-dom'

const LayoutClient = () => {
  return (
    <div>
      <header>Header</header>
      <main>
          <Outlet></Outlet>
      </main>
      <footer>footer</footer>
    </div>
  )
}

export default LayoutClient