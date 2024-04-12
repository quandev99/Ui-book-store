import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons'

const Footer = () => {
  return (
    <div className='w-xl px-5 mx-auto md:px-10 h-auto bg-white w-full '>
      <div className='grid grid-cols-1 md:grid-cols-3  gap-4 py-3 '>
        <div className='col-span-1 grid-flow-col border-none lg:border-gray-200 lg:border-r-2'>
          <div className='w-[200px] mb-3'>
            <img
              className='w-full h-full object-contain'
              src='https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png'
            />
          </div>
          <div className='mb-3'>
            <p className='mb-2'>
              Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCMCông Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA60 - 62 Lê Lợi,
              Quận 1, TP. HCM, Việt Nam
            </p>
            <p>
              Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại
              văn phòng cũng như tất cả Hệ Thống Fahasa trên toàn quốc.
            </p>
          </div>
          <div>
            <div className='w-[150px] mb-2'>
              <img
                className='w-full h-full object-cover'
                src='https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/logo-bo-cong-thuong-da-thong-bao1.png'
                alt=''
              />
            </div>
            <div className='flex gap-x-3'>
              <div className='w-10 text-3xl'>
                <FacebookOutlined />
              </div>
              <div className='w-10 text-3xl'>
                <InstagramOutlined />
              </div>
              <div className='w-10 text-3xl'>
                <YoutubeOutlined />
              </div>
              <div className='w-10 text-3xl'>
                <TwitterOutlined />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full col-span-2 gax-x-4'>
          <div className='grid grid-cols-1 items-center justify-center gap-x-4 sm:grid-cols-2 md:grid-cols-3'>
            <div className='col-span-1 grid-flow-col'>
              <h3>DỊCH VỤ</h3>
              <p>Điều khoản sử dụng</p>
              <p>Chính sách bảo mật thông tin cá nhân</p>
              <p>Chính sách bảo mật thanh toán</p>
              <p>Giới thiệu Fahasa</p>
              <p>Hệ thống trung tâm - nhà sách</p>
            </div>
            <div className='grid-flow-col'>
              <h3>DỊCH VỤ</h3>
              <p>Điều khoản sử dụng</p>
              <p>Chính sách bảo mật thông tin cá nhân</p>
              <p>Chính sách bảo mật thanh toán</p>
              <p>Giới thiệu Fahasa</p>
              <p>Hệ thống trung tâm - nhà sách</p>
            </div>
            <div className='grid-flow-col'>
              <h3>DỊCH VỤ</h3>
              <p>Điều khoản sử dụng</p>
              <p>Chính sách bảo mật thông tin cá nhân</p>
              <p>Chính sách bảo mật thanh toán</p>
              <p>Giới thiệu Fahasa</p>
              <p>Hệ thống trung tâm - nhà sách</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer