import { useEffect, useState } from 'react'
import type { StepsProps } from 'antd'
import { Popover, Spin, Steps } from 'antd'
import { useCancelBillMutation, useGetBillByIdQuery, useUpdateBillStatusMutation } from '~/app/services/bill'
import { useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { formatDate, formatPrice } from '~/utils/format'
import { handleSuccess } from '~/utils/toast'
import Reviews from '../components/ReviewOrder'
const customDot: StepsProps['progressDot'] = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
)
const items = [
  { index: 0, key: 'Pending', title: 'Đang chờ xác nhận' },
  { index: 1, key: 'Confirmed', title: 'Đã Xác Nhận' },
  { index: 2, key: 'Delivering', title: 'Đang Giao Hàng' },
  { index: 3, key: 'Completed', title: 'Hoàn thành' },
  { index: 4, key: 'Abort', title: 'Đã Hủy' }
]
const UpdateOrderCustomer = () => {
  const [current, setCurrent] = useState(0)
  const [billStatus, setBillStatus] = useState('')
  const [loadingBill, setLoadingBill] = useState(false)
  const { id } = useParams<{ id: string | any }>()
  const { data: dataBillUserApi, isLoading, error } = useGetBillByIdQuery(id)
  const [updateBillStatus] = useUpdateBillStatusMutation()
  const [cancelBill] = useCancelBillMutation()
  const dataBillUser = dataBillUserApi?.bill
  useEffect(() => {
    if (dataBillUser) {
      setBillStatus(dataBillUser?.bill_status)
      setCurrent(Number(indexStatus))
    }
  }, [dataBillUser, current])
  const indexStatus = items.findIndex((item) => item?.key === billStatus)
  const updateBill = async () => {
    try {
      setLoadingBill(true)
      const nextStatusIndex = 3
      const newStatus = items[+nextStatusIndex]?.key
      if (nextStatusIndex < items.length && newStatus === "Completed") {
        const data = {
          id,
          newStatus
        }
        const result = await updateBillStatus(data).unwrap()
        setBillStatus(result?.bill.bill_status)
        handleSuccess('updateBill')
        setLoadingBill(false)
      }
    } catch (error) {
      console.log('Failed to update', error)
      setLoadingBill(true)
    } finally {
      setLoadingBill(false)
    }
  }
  const handleCancelBill = async () => {
    try {
      setLoadingBill(true)
      const nextStatusIndex = 4
      const newStatus = items[nextStatusIndex]?.key
      if (nextStatusIndex < items.length && newStatus === 'Abort') {
        const data = {
          id,
          newStatus
        }
        const result = await cancelBill(data).unwrap()
        setBillStatus(result?.bill.bill_status)
        handleSuccess('cancelBill')
        setLoadingBill(false)
      }
    } catch (error) {
      console.log('Failed to update', error)
      setLoadingBill(true)
    } finally {
      setLoadingBill(false)
    }
  }
  const billSucceeded = dataBillUser?.bill_status === 'Delivering'
  const hiddenButton = dataBillUser?.bill_status !== 'Pending'
  const hiddenButtonReview = dataBillUser?.bill_status === 'Completed'
  if (error) {
    if ('data' in error) {
      if (error.data) {
        const errorWithMessage = error as { data: { message: string } }
        return (
          <div className='text-red-500 p-4 text-2xl font-medium bg-red-300'>Error: {errorWithMessage.data.message}</div>
        )
      }
    } else {
      // Xử lý trường hợp `error` không có thuộc tính 'data' ở đây
      return <div className='text-red-500 p-4 text-2xl font-medium bg-red-300'>Error: Error connect server</div>
    }
  }
  const content = (
    <div className='font-medium'>
      <p>Cập nhật mới nhất</p>
      <p>{formatDate(dataBillUser?.updatedAt)}</p>
    </div>
  )

  // Review
   const [open, setOpen] = useState(false)
   const [reviewBillId, setReviewBillId] = useState(null)
   const openReviewModal = (billId: string | any) => {
    console.log("openReviewModal", billId);
     setOpen(true)
     setReviewBillId(billId)
   }
  return (
    <div>
      {isLoading && (
        <div className='fixed z-50 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      )}
      {isLoading && <div className='fixed inset-0 z-50 bg-black opacity-50'></div>}
      {loadingBill && <div className='fixed inset-0 z-50 bg-black opacity-50'></div>}
      {/* Spin component */}
      {loadingBill && (
        <div className='fixed z-50 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      )}
      <div className='bg-slate-100 p-5 pt-10 rounded-lg'>
        <Steps current={current} progressDot={customDot} items={items} />
      </div>
      <div className='my-5'>
        <div className='grid grid-cols-4 gap-x-5'>
          <div className='col-span-3 '>
            <div className='mb-5'>
              <div className='bg-slate-100 mb-5 p-5 rounded-md'>
                <h1 className='text-2xl font-medium'>Thông tin khách hàng</h1>
                <div className='grid grid-cols-2 w-[300px]'>
                  <h5>Họ tên khách hàng:</h5> <p className='font-medium'>{dataBillUser?.bill_user_name}</p>
                  <h5>Email khách hàng: </h5> <p className='font-medium'>{dataBillUser?.bill_phoneNumber}</p>
                  <h5>Số lượng sản phẩm:</h5> <p className='font-medium'>{dataBillUser?.bill_totalOrder}</p>
                </div>
              </div>
              <div className='bg-slate-100 p-5 rounded-md'>
                <h1 className='text-2xl font-medium'>Địa chỉ</h1>
                <div className='grid grid-cols-2 w-[300px]'>
                  <h5>Số điện thoại:</h5> <span className='font-medium'>{dataBillUser?.bill_phoneNumber}</span>
                  <h5>Địa chỉ nhận hàng: </h5>{' '}
                  <span className='font-medium'>{dataBillUser?.bill_shipping_Address}</span>
                </div>
              </div>
            </div>
            <div className='bg-gray-100 p-5'>
              <div className='bg-white p-5'>
                <div className='flex justify-between items-center'>
                  <div className='mb-5'>
                    <span className='text-white bg-primary p-2 rounded-md mr-2'>Book Store</span>
                    <span className='text-white bg-blue-500 p-2  rounded-md'>
                      Mã đơn hàng : {dataBillUser?.bill_code}
                    </span>
                  </div>
                  <div>
                    <Popover content={content}>
                      <span className='text-blue-500'>
                        {dataBillUser?.status ? 'Đã thanh toán' : 'Chưa thanh toán'} |{' '}
                      </span>
                    </Popover>

                    {items?.map((item, index) => {
                      if (item?.key === dataBillUser?.bill_status) {
                        return (
                          <span className='text-primary' key={index}>
                            {item?.title}
                          </span>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
                {dataBillUser?.bill_details?.map((items, index) => (
                  <div className='shadow-lg flex justify-between items-center px-2 mb-5' key={index}>
                    <div className='flex justify-between items-center'>
                      <div className='w-20 h-20'>
                        <img src={items?.product_image} className='w-full h-full object-cover' />
                      </div>
                      <div className='ml-4'>
                        <h1>{items?.product_name}</h1>
                        <span className='text-medium'>
                          x <b>{items?.quantity}</b>
                        </span>
                      </div>
                    </div>
                    <div className='text-[18px]'>
                      <span className='text-gray-400 mr-1'>
                        {formatPrice(items?.product_id?.discounted_price || items?.product_id?.price)}
                      </span>
                      <span className='text-primary'>{formatPrice(items?.price)}</span>
                    </div>
                  </div>
                ))}
                {dataBillUser?.bill_totals?.map((items, index) => (
                  <div className='mr-auto text-right mb-5' key={index}>
                    {items?.title} :
                    <span className='text-primary font-medium text-xl'>{formatPrice(items?.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='col-span-1 bg-gray-100 p-4 '>
            <div className='flex flex-col mb-5'>
              <h3 className='font-medium  mb-3'>Trạng thái đơn hàng</h3>
              {items?.map((item, index) => {
                if (item?.key == billStatus) {
                  return (
                    <span className='p-2 bg-slate-100 text-green-500 border bottom-1' key={index}>
                      {item?.title}
                    </span>
                  )
                }
                return null
              })}
            </div>
            <div className='flex flex-col mb-8'>
              <h3 className='font-medium mb-3'>Trạng thái thanh toán</h3>
              <span className='p-2 bg-slate-100 text-green-500 border bottom-1'>
                {dataBillUser?.status ? 'Đã thanh toán' : 'Chưa thanh toán'}
              </span>
            </div>
            <button
              onClick={updateBill}
              disabled={!billSucceeded}
              className={`text-white  w-full mb-3 p-2 block rounded-md ${
                billSucceeded ? 'bg-blue-500' : 'bg-blue-200'
              }`}
            >
              Cập nhật
            </button>

            <button
              onClick={handleCancelBill}
              disabled={hiddenButton}
              className={`text-white bg-primary hover:border-primary  transition-all w-full mb-3 p-2 block rounded-md ${
                hiddenButton ? 'bg-red-200' : ' bg-primary'
              }`}
            >
              Hủy
            </button>
            <div>
              <button
                className={` text-white border-2 border-green-100   transition-all rounded-md p-2 block w-full ${
                  hiddenButtonReview ? 'bg-green-400 hover:bg-green-600' : 'bg-green-200 hover:border-green-300'
                }`}
                onClick={() => openReviewModal(dataBillUser?._id)}
                disabled={dataBillUser?.is_review}
              >
                Đánh giá
              </button>
              <Reviews open={open} setOpen={setOpen} billId={reviewBillId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateOrderCustomer
