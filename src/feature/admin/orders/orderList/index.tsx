import { Tabs } from 'antd'
import React, { useCallback, useEffect } from 'react'
import ListOrderItem from '../abc'
  const tabContent = [
    { key: '', value: '', title: 'Tất cả' },
    { key: 'Pending', value: 'Pending', title: 'Đang xác nhận' },
    { key: 'Confirmed', value: 'Confirmed', title: 'Đã Xác Nhận' },
    { key: 'Delivering', value: 'Delivering', title: 'Đang Giao Hàng' },
    { key: 'Delivered', value: 'Delivered', title: 'Đã Giao Hàng' },
    // { key: 'DeliveryFailed', value: 'DeliveryFailed', title: 'Giao Hàng Thất Bại' },
    { key: 'Abort', value: 'Abort', title: 'Đã Hủy' },
    { key: 'Completed', value: 'Completed', title: 'Hoàn thành' }
  ]
const ListOrder = () => {
  const [activeTab, setActiveTab] = React.useState('')
  const handleTabChange = (value) => {
    console.log("handleTabChange", value)
    setActiveTab(value)
  }
  return (
    <>
      <div className='mb-5'>
        <Tabs activeKey={activeTab} defaultActiveKey={activeTab} onChange={handleTabChange}>
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
