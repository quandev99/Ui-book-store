import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUserData } from '~/store/helper/getDataLocalStorage'
const CustomerPage = () => {
  const { user} = getUserData()
  const location = useLocation()
  const userImage = user?.image
  const userName = user?.name
  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    // Lấy path của trang hiện tại từ location
    const path = location.pathname

    // Cập nhật trạng thái của trang hiện tại
    setCurrentPage(path)
  }, [location])
  return (
    <div className='px-2 mx-auto mt-1 md:px-5'>
      <div className='grid gap-4 lg:grid-cols-5'>
        <div className='col-span-1'>
          <div className='py-2 mb-5 rounded-md'>
            <ul className='grid grid-cols-1  md:grid-cols-1 gap-3 w-[350px] md:w-[200px] md:ml-3 pt-3'>
              <Link
                to=''
                className='cursor-pointer flex items-center gap-3 md:text-[15px]  px-3 py-1 duration-300 transition-all '
              >
                <div className=' w-[40px] h-[40px]'>
                  <img
                    src={userImage?.url || 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png'}
                    className='w-full h-full rounded-full'
                    alt='avatar'
                  />
                </div>
                <h1>{userName}</h1>
              </Link>
              <Link
                to='account'
                className={`  ${
                  currentPage === '/account' ? 'text-primary' : 'hover:text-primary'
                }  cursor-pointer  md:text-[15px]  px-3 py-1 duration-300 flex  items-center gap-2 transition-all `}
              >
                Thông tin tài khoản
              </Link>
              <Link
                to='change-password-new'
                className={`  ${
                  currentPage === '/account/change-password-new' ? 'text-primary' : 'hover:text-primary'
                } cursor-pointer  md:text-[15px]  px-3 py-1 duration-300 flex  items-center gap-2 transition-all `}
              >
                Đổi mật khẩu
              </Link>

              <Link
                to='favorites'
                className={` ${
                  currentPage === '/account/favorites' ? 'text-primary' : 'hover:text-primary'
                } cursor-pointer  md:text-[15px]  px-3 py-1 duration-300 flex  items-center gap-2 transition-all `}
              >
                Yêu thích
              </Link>
              <Link
                to='order'
                className={` ${
                  currentPage === '/account/order' ? 'text-primary' : 'hover:text-primary'
                } cursor-pointer  md:text-[15px]  px-3 py-1 duration-300 flex  items-center gap-2 transition-all `}
              >
                Đơn hàng
              </Link>
              <Link
                to='vouchers'
                className={` ${
                  currentPage === '/account/vouchers' ? 'text-primary' : 'hover:text-primary'
                } cursor-pointer flex items-center gap-2 md:text-[15px]   px-3 py-1 duration-300 transition-all `}
              >
                Kho voucher
              </Link>
              <Link
                to='reviews'
                className={` ${
                  currentPage === '/account/reviews' ? 'text-primary' : 'hover:text-primary'
                } cursor-pointer  md:text-[15px]  px-3 py-1 duration-300 flex  items-center gap-2 transition-all `}
              >
                Đánh giá
              </Link>
            </ul>
          </div>
        </div>
        <div className='col-span-4 bg-gray-50  shadow-md p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default CustomerPage
