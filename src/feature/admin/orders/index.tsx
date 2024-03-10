
import { Tabs } from 'antd'
import React from 'react'
import ListOderAdmin from './orderList'
import { tabContent } from '~/constans'
import { TabPane } from '~/components/ant/TabPane'

const OrderAdmin = () => {
  const [activeTab, setActiveTab] = React.useState('')
  const handleTabChange = (value) => {
    setActiveTab(value)
  }
  //  const TabPane = (tabContent, activeTab) => {
  //    return tabContent.map((item) => {
  //      return {
  //        key: item.key,
  //        label: item.title,
  //        children: <ListOderAdmin tabKey={activeTab} />
  //      }
  //    })
  //  }
     const renderChildComponent = () => {
       // Hàm này trả về component con (ChildComponent)
       return <ListOderAdmin tabKey={activeTab} />
     }
  return (
    <>
      <div className='mb-5 '>
        <div className='flex items-center justify-between p-4'>
          <h1 className='text-xl font-bold'>Danh sách đơn hàng</h1>
        </div>
        <Tabs
          activeKey={activeTab}
          defaultActiveKey={activeTab}
          onChange={handleTabChange}
          tabBarGutter={90}
          items={TabPane(tabContent, renderChildComponent)}
        ></Tabs>
        {/* {tabContent.map((item) => (
            <Tabs.TabPane key={item.key} tab={item.title}>
              <ListOderAdmin tabKey={activeTab} />
            </Tabs.TabPane>
          ))} */}
      </div>
    </>
  )
}

export default OrderAdmin
