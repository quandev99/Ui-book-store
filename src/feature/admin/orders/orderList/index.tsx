import { Tabs } from 'antd'
import React, { useCallback } from 'react'
import ListOrderItem from '../abc'

const ListOrder = () => {
  const [activeTab, setActiveTab] = React.useState('getAllOrder')
  const handleTabChange = (key) => {
    setActiveTab(key)
  }



  const tabContent = [
    { key: 'getAllOrder', title: 'Tất cả' },
    { key: 'pending', title: 'Đang xác nhận' },
    { key: 'confirmed', title: 'Đã Xác Nhận' },
    { key: 'delivering', title: 'Đang Giao Hàng' },
    { key: 'delivered', title: 'Đã Giao Hàng' },
    { key: 'deliveryFailed', title: 'Giao Hàng Thất Bại' },
    { key: 'abort', title: 'Đã Hủy' }
  ]

  return (
    <>
      <div className='  mb-5'>
        <Tabs activeKey={activeTab} onChange={handleTabChange} >
          {tabContent.map((item) => (
            <Tabs.TabPane key={item.key} tab={item.title}>
              <ListOrderItem tabKey={activeTab} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </>
  )
}

export default ListOrder
