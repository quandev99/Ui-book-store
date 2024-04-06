import { Form, Input, Modal } from 'antd'
import React from 'react'
import { useApplyDiscountToCartMutation, useGetAllDiscountsQuery } from '~/app/services/discount'
import { getUserData } from '~/store/helper/getDataLocalStorage'
import { handleError, handleSuccess } from '~/utils/toast'
function ListCoupon(props) {
  const { discount_amount, discount_content, discount_name, expiration_date } = props?.item
  const handleApplyCoupon = () => {}
  return (
    <div className='flex flex-row items-start justify-stretch rounded-lg relative h-[145px] cursor-pointer select-none mb-4'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 left-0 bottom-full right-full w-ful h-full'
        viewBox='7.5 -2 478.833 148'
        style={{ filter: 'drop-shadow(rgba(0, 0, 0, 0.15) 0px 1px 3px)' }}
      >
        <g fill='none' fillRule='evenodd'>
          <g>
            <g>
              <g>
                <g transform='translate(-544 -3050) translate(80 2072) translate(0 930) translate(464 48)'>
                  <path
                    className='my-path'
                    id='Frame_voucher_Web'
                    d='M 110 144 h -98 a 12 12 0 0 1 -12 -12 v -122 a 12 12 0 0 1 12 -12 H 110 a 12.02 12 0 0 0 24 0 H 480.833 a 12 12 0 0 1 12 12 V 132 a 12 12 0 0 1 -12 12 H 134 v 0 a 12 12 0 0 0 -24 0 v 0 Z'
                    transform='translate(0.5 0.5)'
                    fill='#fff'
                    stroke='rgba(0,0,0,0)'
                    strokeMiterlimit='10'
                    strokeWidth='1'
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
      <div className='aaaaa relative flex items-center justify-center w-[150px]  h-full top-0 left-0'>
        <img
          className='max-w-full h-auto object-cover rounded-xl'
          src='https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/promotion/ico_promotion.svg?q=105567'
        />
      </div>
      <div className='relative flex flex-col self-stretch items-stretch py-4 px-2 w-full justify-between sm:w-[calc(100% - 140px)]'>
        <div>
          <div className='flex items-center justify-between '>
            <h3 className='font-medium truncate'>{discount_name}</h3>
            <p className='text-[#2F80ED] underline text-sm'>Chi tiết</p>
          </div>
          <p className='text-[10px] text-slate-400'>Không Áp Dụng Cho Sách Giáo Khoa</p>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-between'>
            <img src='https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/promotion/ico_check.svg?q=105567' />
            <span style={{ paddingLeft: '4px', color: '#2F80ED' }}>Đã áp dụng</span>
          </div>
          <div>
            <button
              type='button'
              title='Bỏ chọn'
              className='text-[#2F80ED] font-medium py-1 w-[100px] rounded-md border border-[#2F80ED]'
              onClick={() => handleApplyCoupon()} // Thay đổi hàm xử lý sự kiện
            >
              <span>Bỏ chọn</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
const AppLyModal = ({ isAddAppLyVisible, setIsAddAppLyVisible }) => {
   const { data } = useGetAllDiscountsQuery()
   const dataDiscount = data?.discounts
   console.log('data', dataDiscount)
  const [applyDiscountToCar] = useApplyDiscountToCartMutation()
  const [messageError, setMessageError] = React.useState("")
  const [form]: any = Form.useForm()
  const { user: userData } = getUserData()
  const userId = userData?._id
  const handleOk = async () => {
    try {
      const data: any = {
        userId,
        discountCode: form.getFieldValue('code')
      }
      const result = await applyDiscountToCar(data).unwrap()
      if (result) {
        setMessageError(result?.message)
        handleSuccess(result?.message)
        setTimeout(() => {
          setMessageError('')
        }, 2000)
      }
      form.resetFields(['code'])
    } catch (error) {
      form.resetFields(['code'])
      setMessageError(error?.data?.message)
      handleError(error?.data?.message)
      setTimeout(() => {
        setMessageError("")
      }, 2000)
    }
  }
  const handleCancel = () => {
    setIsAddAppLyVisible(false)
    form.resetFields()
  }
  return (
    <Modal title='Tạo phòng' open={isAddAppLyVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form}>
        <Form.Item name='code' label='Áp mã' rules={[{ required: true, message: 'Code is required!' }]}>
          <Input placeholder='Áp mã giảm giá' />
        </Form.Item>
        <p className='text-primary'>{messageError}</p>
      </Form>
        <div className='overflow-y-auto h-full'>
          <div className='overflow-x-hidden h-[250px] max-h-full p-2'>
            <div className=''>
              <h3>Mã giảm </h3>
              {dataDiscount?.map((item) => <ListCoupon item={item} key={item?._id}></ListCoupon>)}
            </div>
          </div>
      </div>
    </Modal>
  )
}

export default AppLyModal
