import { Outlet } from 'react-router-dom'
import Footer from '~/components/common/footer'
import Header from '~/components/common/header'

const LayoutClient = () => {
  return (
    <div>
      <Header></Header>
      <main className='w-xl p-10 mx-auto  bg-white w-full'>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default LayoutClient