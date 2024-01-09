import React, { useEffect, useState } from 'react'
import type { StepsProps } from 'antd'
import { Popover, Spin, Steps } from 'antd'
import { useGetBillByIdQuery, useUpdateBillStatusMutation } from '~/app/services/bill'
import { useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
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
const description = 'You can hover on the dot.'
const UpdateOrder = () => {
  const [current, setCurrent] = useState(0)
  const [billStatus, setBillStatus] = useState("")
  const [loadingBill, setLoadingBill] = useState(false)
  const { id } = useParams<{ id: string | any }>()
  const { data: dataBillUserApi, isLoading, error } = useGetBillByIdQuery(id)
   const [updateBillStatus] = useUpdateBillStatusMutation()
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
     const nextStatusIndex = indexStatus + 1
    if (nextStatusIndex < items.length && nextStatusIndex !== 4) {
      const newStatus = items[nextStatusIndex]?.key
        const data = {
          id,
          newStatus
        }
        const result = await updateBillStatus(data).unwrap()
        setBillStatus(result?.bill.bill_status)
        setLoadingBill(false)
    }
  }  catch (error) {
    console.log("Failed to update", error);
    setLoadingBill(true)
  } finally {
    setLoadingBill(false)
  }
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
      <Steps current={current} progressDot={customDot} items={items} />
      {billStatus !== 'Abort' && (
        <button onClick={updateBill} className='text-white bg-green-500 p-2 block rounded-md'>
          Cập nhật
        </button>
      )}
    </div>
  )
}

export default UpdateOrder