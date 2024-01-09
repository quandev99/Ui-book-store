import { Tabs } from 'antd'
import React, { useCallback, useEffect } from 'react'
import ListOrderItem from '../abc'
  const tabContent = [
    { key: '',  title: 'Tất cả' },
    { key: 'Pending', title: 'Đang chờ xác nhận' },
    { key: 'Confirmed', title: 'Đã Xác Nhận' },
    { key: 'Delivering', title: 'Đang Giao Hàng' },
    // { key: 'Delivered', title: 'Đã Giao Hàng' },
    // { key: 'DeliveryFailed', title: 'Giao Hàng Thất Bại' },
    { key: 'Completed', title: 'Hoàn thành' },
    { key: 'Abort',  title: 'Đã Hủy' },
  ]
const ListOrder = () => {
  const [activeTab, setActiveTab] = React.useState('')
  const handleTabChange = (value) => {
    console.log("handleTabChange", value)
    setActiveTab(value)
  }
  return (
    <>
      <div className='mb-5 '>
        <Tabs
          activeKey={activeTab}
          defaultActiveKey={activeTab}
          onChange={handleTabChange}
          tabBarGutter={90}
        >
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
