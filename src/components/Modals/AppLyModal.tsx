import { StepForwardOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Modal, Row, Space, } from 'antd'
import React from 'react'
import { useApplyDiscountToCartMutation, useGetAllDiscountsQuery, useUnDiscountCartMutation } from '~/app/services/discount'
import { getUserData } from '~/store/helper/getDataLocalStorage'
import { handleError, handleSuccess } from '~/utils/toast'
function ListCoupon(props) {
  const [applyDiscountToCart] = useApplyDiscountToCartMutation()
  const [unDiscountCart] = useUnDiscountCartMutation()
  const {
    _id,
    discount_amount,
    discount_content,
    refetch,
    discount_name,
    discount_code,
    userId,
    discountId,
    expiration_date
  } = props?.item
  const handleApplyCoupon = async (discount_code) => {
    console.log(discountId == _id)
    console.log('dataDiscount', discount_code)
    try {
      const data: any = {
        userId,
        discountCode: discount_code
      }
      const result = await applyDiscountToCart(data).unwrap()
      if (result) {
        refetch()
        handleSuccess(result?.message)
      }
    } catch (error) {
      handleError(error?.data?.message)
      console.log(error)
    }
  }
  const handleUnDiscountCart = async (value) => {
    try {
      const data: any = {
        userId,
        discountId: value
      }
      const result = await unDiscountCart(data).unwrap()
      if (result) {
        refetch()
        handleSuccess(result?.message)
      }
    } catch (error) {
      handleError(error?.data?.message)
      console.log(error)
    }
  }
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

        {discountId === _id ? (
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
                onClick={() => handleUnDiscountCart(_id)} // Thay đổi hàm xử lý sự kiện
              >
                <span>Bỏ chọn</span>
              </button>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-end '>
            <button
              type='button'
              title='Bỏ chọn'
              className='text-[#2F80ED] font-medium py-1 w-[100px] rounded-md border border-[#2F80ED]'
              onClick={() => handleApplyCoupon(discount_code)} // Thay đổi hàm xử lý sự kiện
            >
              <span>Áp dụng</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
const AppLyModal = ({ isAddAppLyVisible, setIsAddAppLyVisible, discountId, refetch }) => {

  const [url, setUrl] = React.useState('')
  React.useEffect(() => {
    setUrl(`?_page=${1}&_limit=${10}&_order=${'asc'}`)
    // setUrl(`?_page=${pageDiscount}&_limit=${limitPage}&_sort=${sortDiscount}&_order=${orderDiscount}`)
  }, [url])
  const { data } = useGetAllDiscountsQuery(url)
  const dataDiscount = data?.discounts

  const [applyDiscountToCar] = useApplyDiscountToCartMutation()
  const [messageError, setMessageError] = React.useState('')
  const [form]: any = Form.useForm()
  const { user: userData } = getUserData()
  const userId = userData?._id
  const handleOk = async () => {
    setIsAddAppLyVisible(false)
    form.resetFields()
  }
  const handleCancel = () => {
    setIsAddAppLyVisible(false)
    form.resetFields()
  }

  const onFinish = async () => {
    try {
      const data: any = {
        userId,
        discountCode: form.getFieldValue('code').trim()
      }
      const result = await applyDiscountToCar(data).unwrap()
      if (result) {
        setMessageError(result?.message)
        handleSuccess(result?.message)
         refetch()
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
        setMessageError('')
      }, 2000)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Modal
      width={550}
      title='CHỌN MÃ KHUYẾN MÃI'
      open={isAddAppLyVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name='form'
        style={{ maxWidth: '100%' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <div className='relative z-10 h-[60px] w-full '>
          <div className='absolute w-full h-full top-0 left-0'>
            <Form.Item name='code' rules={[{ required: true, message: 'Mã giảm giá không được để trống!' }]}>
              <Input placeholder='Áp mã giảm giá' />
            </Form.Item>
          </div>
          <p className='text-primary absolute left-0 bottom-0'>{messageError}</p>
          <div
            className='absolute w-auto right-1  top-1 flex items-center justify-between'
            style={{ height: 'calc(100% - 35px)' }}
          >
            <>
              <Button
                className='bg-primary h-full text-[12px] text-center'
                type='primary'
                htmlType='submit'
                // onClick={onFinish}
              >
                Áp mã
              </Button>
            </>
          </div>
        </div>
      </Form>
      <div className='overflow-y-auto h-full'>
        <div className='overflow-x-hidden h-[250px] max-h-full p-2 overflow-y-auto '>
          <div className=''>
            <h3>Mã giảm </h3>
            {dataDiscount?.map((item) => (
              <ListCoupon item={{ userId, discountId, refetch, ...item }} key={item?._id}></ListCoupon>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AppLyModal
