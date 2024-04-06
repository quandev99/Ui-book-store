import { Form, Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import AppLyModal from '~/components/Modals/AppLyModal';
import Icon from '../../../../assets/images/coupon.png'
const ApplyDiscount = () => {
   const [isModalOpen, setIsModalOpen] = React.useState(false)
  
  const showModal = () => {
    setIsModalOpen(true)
  }
  return (
    <div>
      <div className='box-header px-4 py-2 cursor-pointer'>
        <div className='flex items-center gap-x-4' onClick={showModal}>
          <div className='h-full w-10'>
            <img src={Icon} alt='' />
          </div>
          <h1 className='uppercase font-medium text-[17px]'>Khuyến mãi</h1>
        </div>
      </div>
      <AppLyModal isAddAppLyVisible={isModalOpen} setIsAddAppLyVisible={setIsModalOpen}></AppLyModal>
    </div>
  )
}

export default ApplyDiscount
