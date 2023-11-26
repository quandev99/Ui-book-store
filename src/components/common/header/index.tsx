import { LoginOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
  const authData = useSelector((state) => state)
  const {user,tokens} = authData.authSlice
  console.log('user,tokens', user,tokens)
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
          <div className='flex cursor-pointer items-center gap-x-5'>
            <div className='ml-2'>
              <span className='relative mr-4 '>
                <span className=' transition-all text-2xl'>
                  <ShoppingCartOutlined />
                </span>
                <span className='absolute text-center px-1 text-sm leading-4; rounded-[50%]  bg-gray-300 text-red-400'>
                  0
                </span>
              </span>
              <span className=' text-black transition-all text-2xl'>
                <UserOutlined />
              </span>
            </div>
            <div className='account menu-item'>
              {1 ? (
                <Link to='/signin' className='bg-gray-200'>
                  <img
                    width={50}
                    className='rounded-full'
                    src={'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png'}
                    alt='Avata'
                  />
                </Link>
              ) : (
                <Link to='/signin'>
                  <LoginOutlined />
                </Link>
              )}
              {1 ? (
                <ul className='submenu'>
                  <li>
                    <Link to=''>Thông tin tài khoản</Link>
                  </li>
                  <li>
                    <button>Đăng xuất</button>
                  </li>
                </ul>
              ) : (
                <ul className='submenu'>
                  <li>
                    <Link to='/signin'>Đăng nhập</Link>
                  </li>
                  <li>
                    <Link to='/signup'>Đăng ký</Link>
                  </li>
                </ul>
              )}
              {1 === 1 ? (
                <ul className='submenu'>
                  <li>
                    <Link to=''>Thông tin tài khoản</Link>
                  </li>
                  <li>
                    <Link to='/admin'>Trang quản trị</Link>
                  </li>
                  <li>
                    <button>Đăng xuất</button>
                  </li>
                </ul>
              ) : (
                <div className='cart'></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header