import React from 'react'
import { Tabs } from 'antd'
import { tabContent } from '~/constans'
import { TabPane } from '~/components/ant/TabPane'
import ListOrderCustomer from './components/ListOrderCustomer'

const OrderPage = () => {
  const [activeTab, setActiveTab] = React.useState('')
  const handleTabChange = (value) => {
    setActiveTab(value)
  }
    const renderChildComponent = () => {
      return <ListOrderCustomer tabKey={activeTab} />
    }
  return (
    <div>
      <>
        <div className='mb-5 '>
          <div className='flex items-center justify-between p-4'>
            <h1 className='text-xl font-bold'>Danh sách đơn hàng của bạn</h1>
          </div>
          <Tabs
            activeKey={activeTab}
            defaultActiveKey={activeTab}
            onChange={handleTabChange}
            tabBarGutter={90}
            items={TabPane(tabContent, renderChildComponent)}
          ></Tabs>
        </div>
      </>
    </div>
  )
}

export default OrderPage