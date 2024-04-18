import { BellOutlined, LoginOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '~/app/services/auth'
import { useGetCartByUserQuery } from '~/app/services/cart'
import { useGetNotificationByUserQuery } from '~/app/services/notificotion'
import { decodeAccessToken } from '~/hooks/decodeToken'
import { JwtPayload } from '~/interfaces/JwtPayload'
import { resetState } from '~/store/authSlice/authSlice'
import { getUserData } from '~/store/helper/getDataLocalStorage'
import { handleSuccess } from '~/utils/toast'
import moment from 'moment'
import Notification from './components/Notification'
const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, tokens } = getUserData()
   const userId = user?._id
  const { data: dataCartApi, refetch } = useGetCartByUserQuery(userId)


   const dataCart = dataCartApi?.carts ?? null
   const [totalCartLength, setTotalCartLength] = useState<number | null>(null)

   useEffect(() => {
     if (dataCartApi?.carts?.products) {
       setTotalCartLength(dataCartApi?.carts?.products?.length ?? 0)
     }
   }, [dataCartApi])

  const [decodedToken, setDecodedToken] = useState<any | null>(null)
  useEffect(() => {
    if (tokens?.accessToken) {
      const decoded: JwtPayload | null = decodeAccessToken(tokens?.accessToken)
      setDecodedToken(decoded)
    }
  }, [tokens?.accessToken])
  const userImage = user?.image?.url || 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png'
  const userEmail = user?.name
  const userRole = decodedToken?.role
  const [logout] = useLogoutMutation()
  const handleLogout = async () => {
    try {
     localStorage.clear()

     const data = await logout().unwrap()
     dispatch(resetState())
     if (data) handleSuccess('logout')
     navigate('/')
        return  navigate('/')
      // dispatch(resetState())
  } catch (error) {
    console.log('Failed to log out', error)
  }
}
const notificationParams = {
  userId :userId,
  page:1,
  limit:10,
}
const {
  data: dataNotificationApi,
  isLoading,
  error,
  refetch: notificationRefetch
} = useGetNotificationByUserQuery(notificationParams, {
  refetchOnMountOrArgChange: true
})
useEffect(() => {
  notificationRefetch()
}, [dataNotificationApi])
const dataNotifications = dataNotificationApi?.notifications
console.log('Notification', dataNotifications)
  return (
    <div className='w-xl p-10 mx-auto h-[100px] bg-white w-full'>
      <div className='flex items-center justify-between'>
        <div className='w-[150px] h-full'>
          <img
            className='w-full h-full object-cover'
            src='https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png'
          />
        </div>
        <div className='flex justify-center items-center bg-white'>
          <input className='px-4 rounded-md h-full outline-none' type='text' placeholder='Tìm kiếm sách ...' />
          <span className='px-5  bg-primary text-white button-search py-2'>
            <SearchOutlined />
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <ul className='flex items-center py-2 pb-2 font-medium capitalize'>
            <Link to='/' className='pr-3 transition-all  '>
              Trang chủ
            </Link>
            <Link to='/products' className='px-3 transition-all '>
              Sản phẩm
            </Link>
            <Link to='#' className='px-3 transition-all '>
              Giới thiệu
            </Link>
            <Link to='#' className='px-3 transition-all '>
              Liên hệ
            </Link>
            <Link to='#' className='px-3 transition-all '>
              Tin tức
            </Link>
          </ul>
          <div className='flex cursor-pointer items-center justify-between gap-x-5'>
            <div className='ml-2 flex items-center justify-between'>
              <Link to='' className='relative mr-4'>
                <Notification notifications={dataNotifications} refetch={notificationRefetch} />
              </Link>
              <Link to='carts' className='relative mr-4'>
                <span className=' transition-all'>
                  <ShoppingCartOutlined className='text-2xl'/>
                </span>
                <span className='items-center absolute w-[20px] h-[20px] rounded-full -top-2 -right-3 text-sm  flex justify-center bg-primary text-white'>
                  {totalCartLength || 0}
                </span>
              </Link>
              <span className=' text-black transition-all text-2xl'>
                <UserOutlined />
              </span>
            </div>
            <div className='account menu-item'>
              {user && userImage ? (
                <Link to='/sign-in' className=' w-10 h-10 block'>
                  <img className='rounded-full w-full h-full object-cover' src={userImage} alt='Avatar' />
                </Link>
              ) : (
                <Link to='/sign-in'>
                  <LoginOutlined />
                </Link>
              )}
              {userRole == 0 ? (
                <ul className='submenu'>
                  <li>
                    <Link to=''>{userEmail}</Link>
                  </li>
                  <li>
                    <Link to='/admin'>Trang quản trị</Link>
                  </li>
                  <li>
                    <Link to='customer'>Thông tin tài khoản</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Đăng xuất</button>
                  </li>
                </ul>
              ) : userRole == 1 ? (
                <ul className='submenu'>
                  <li>
                    <Link to='/'>{userEmail}</Link>
                  </li>
                  <li>
                    <Link to='/admin'>Trang nhân viên</Link>
                  </li>
                  <li>
                    <Link to='customer'>Thông tin tài khoản</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Đăng xuất</button>
                  </li>
                </ul>
              ) : (
                <ul className='submenu'>
                  <li>
                    <Link to='/sign-in'>Đăng nhập</Link>
                  </li>
                  <li>
                    <Link to='/sign-up'>Đăng ký</Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header



