import { Outlet } from 'react-router-dom'
import Footer from '~/components/common/footer'
import Header from '~/components/common/header'

const LayoutClient = () => {
  return (
    <div>
      <Header></Header>
      <main className='w-xl p-5 mx-auto  bg-gray-100 w-full'>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default LayoutClient